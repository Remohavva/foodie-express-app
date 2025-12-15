import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Address, User } from './types'

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

interface UserStore {
  user: User | null
  addresses: Address[]
  selectedAddress: Address | null
  setUser: (user: User | null) => void
  addAddress: (address: Address) => void
  updateAddress: (address: Address) => void
  deleteAddress: (addressId: string) => void
  setSelectedAddress: (address: Address | null) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find(item => 
          item.id === newItem.id && 
          JSON.stringify(item.customizations) === JSON.stringify(newItem.customizations)
        )
        
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === existingItem.id && 
              JSON.stringify(item.customizations) === JSON.stringify(existingItem.customizations)
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            )
          }
        }
        
        return { items: [...state.items, newItem] }
      }),
      
      removeItem: (itemId) => set((state) => ({
        items: state.items.filter(item => item.id !== itemId)
      })),
      
      updateQuantity: (itemId, quantity) => set((state) => ({
        items: quantity <= 0 
          ? state.items.filter(item => item.id !== itemId)
          : state.items.map(item =>
              item.id === itemId ? { ...item, quantity } : item
            )
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },
      
      getTotalPrice: () => {
        const { items } = get()
        return items.reduce((total, item) => {
          let itemPrice = item.menuItem.price
          
          // Add customization prices
          if (item.customizations) {
            Object.values(item.customizations).forEach(options => {
              options.forEach(option => {
                // This would need to be calculated based on customization data
                // For now, we'll assume no extra cost
              })
            })
          }
          
          return total + (itemPrice * item.quantity)
        }, 0)
      }
    }),
    {
      name: 'cart-storage'
    }
  )
)

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      addresses: [
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
      ],
      selectedAddress: null,
      
      setUser: (user) => set({ user }),
      
      addAddress: (address) => set((state) => ({
        addresses: [...state.addresses, address]
      })),
      
      updateAddress: (updatedAddress) => set((state) => ({
        addresses: state.addresses.map(address =>
          address.id === updatedAddress.id ? updatedAddress : address
        )
      })),
      
      deleteAddress: (addressId) => set((state) => ({
        addresses: state.addresses.filter(address => address.id !== addressId)
      })),
      
      setSelectedAddress: (address) => set({ selectedAddress: address })
    }),
    {
      name: 'user-storage'
    }
  )
)