'use client'

import { useState, useEffect } from 'react'
import { CartItem, Address, User } from './types'

// Simple localStorage helpers
const getStoredData = (key: string) => {
  if (typeof window === 'undefined') return null
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch {
    return null
  }
}

const setStoredData = (key: string, data: any) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // Handle storage errors silently
  }
}

// Cart Store
let cartItems: CartItem[] = []
let cartListeners: (() => void)[] = []

export const useCartStore = () => {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    // Load from localStorage on mount
    const stored = getStoredData('cart-storage')
    if (stored?.state?.items) {
      cartItems = stored.state.items
      setItems(cartItems)
    }

    // Subscribe to changes
    const listener = () => setItems([...cartItems])
    cartListeners.push(listener)

    return () => {
      cartListeners = cartListeners.filter(l => l !== listener)
    }
  }, [])

  const addItem = (newItem: CartItem) => {
    const existingIndex = cartItems.findIndex(item => 
      item.id === newItem.id && 
      JSON.stringify(item.customizations) === JSON.stringify(newItem.customizations)
    )
    
    if (existingIndex >= 0) {
      cartItems[existingIndex].quantity += newItem.quantity
    } else {
      cartItems.push(newItem)
    }
    
    setStoredData('cart-storage', { state: { items: cartItems } })
    cartListeners.forEach(listener => listener())
  }

  const removeItem = (itemId: string) => {
    cartItems = cartItems.filter(item => item.id !== itemId)
    setStoredData('cart-storage', { state: { items: cartItems } })
    cartListeners.forEach(listener => listener())
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId)
    } else {
      const item = cartItems.find(item => item.id === itemId)
      if (item) {
        item.quantity = quantity
        setStoredData('cart-storage', { state: { items: cartItems } })
        cartListeners.forEach(listener => listener())
      }
    }
  }

  const clearCart = () => {
    cartItems = []
    setStoredData('cart-storage', { state: { items: cartItems } })
    cartListeners.forEach(listener => listener())
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.menuItem.price * item.quantity)
    }, 0)
  }

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  }
}

// User Store
const defaultAddresses: Address[] = [
  {
    id: '1',
    type: 'home',
    address: '123 Main Street, Banjara Hills',
    landmark: 'Near City Center Mall',
    city: 'Hyderabad',
    pincode: '500034',
    isDefault: true
  },
  {
    id: '2',
    type: 'work',
    address: '456 Tech Park, HITEC City',
    landmark: 'Opposite Metro Station',
    city: 'Hyderabad',
    pincode: '500081',
    isDefault: false
  }
]

let userData = {
  user: null as User | null,
  addresses: defaultAddresses,
  selectedAddress: null as Address | null
}
let userListeners: (() => void)[] = []

export const useUserStore = () => {
  const [state, setState] = useState(userData)

  useEffect(() => {
    // Load from localStorage on mount
    const stored = getStoredData('user-storage')
    if (stored?.state) {
      userData = { ...userData, ...stored.state }
      setState({ ...userData })
    }

    // Subscribe to changes
    const listener = () => setState({ ...userData })
    userListeners.push(listener)

    return () => {
      userListeners = userListeners.filter(l => l !== listener)
    }
  }, [])

  const setUser = (user: User | null) => {
    userData.user = user
    setStoredData('user-storage', { state: userData })
    userListeners.forEach(listener => listener())
  }

  const addAddress = (address: Address) => {
    userData.addresses.push(address)
    setStoredData('user-storage', { state: userData })
    userListeners.forEach(listener => listener())
  }

  const updateAddress = (updatedAddress: Address) => {
    const index = userData.addresses.findIndex(addr => addr.id === updatedAddress.id)
    if (index >= 0) {
      userData.addresses[index] = updatedAddress
      setStoredData('user-storage', { state: userData })
      userListeners.forEach(listener => listener())
    }
  }

  const deleteAddress = (addressId: string) => {
    userData.addresses = userData.addresses.filter(addr => addr.id !== addressId)
    setStoredData('user-storage', { state: userData })
    userListeners.forEach(listener => listener())
  }

  const setSelectedAddress = (address: Address | null) => {
    userData.selectedAddress = address
    setStoredData('user-storage', { state: userData })
    userListeners.forEach(listener => listener())
  }

  return {
    ...state,
    setUser,
    addAddress,
    updateAddress,
    deleteAddress,
    setSelectedAddress
  }
}