export interface Restaurant {
  id: string
  name: string
  image: string
  rating: number
  deliveryTime: number
  costForTwo: number
  cuisine: string[]
  isVeg: boolean
  offers?: string[]
  distance?: number
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image?: string
  isVeg: boolean
  rating?: number
  category: string
  isPopular?: boolean
  customizations?: Customization[]
}

export interface Customization {
  id: string
  name: string
  options: CustomizationOption[]
  required: boolean
  maxSelections?: number
}

export interface CustomizationOption {
  id: string
  name: string
  price: number
}

export interface CartItem {
  id: string
  menuItem: MenuItem
  quantity: number
  customizations?: { [key: string]: string[] }
  restaurantId: string
}

export interface Address {
  id: string
  type: 'home' | 'work' | 'other'
  address: string
  landmark?: string
  city: string
  pincode: string
  isDefault: boolean
}

export interface Order {
  id: string
  restaurantId: string
  restaurantName: string
  items: CartItem[]
  total: number
  status: 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled'
  orderTime: Date
  deliveryTime?: Date
  address: Address
  paymentMethod: string
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  addresses: Address[]
}

export interface Category {
  id: string
  name: string
  image: string
  description?: string
}