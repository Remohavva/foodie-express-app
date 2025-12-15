import { Restaurant } from '@/lib/types'

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Biryani Blues',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400',
    rating: 4.3,
    deliveryTime: 35,
    costForTwo: 400,
    cuisine: ['Biryani', 'North Indian', 'Mughlai'],
    isVeg: false,
    offers: ['50% OFF up to ₹100'],
    distance: 2.1
  },
  {
    id: '2',
    name: 'Pizza Palace',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    rating: 4.1,
    deliveryTime: 25,
    costForTwo: 600,
    cuisine: ['Pizza', 'Italian', 'Fast Food'],
    isVeg: false,
    offers: ['Buy 1 Get 1 Free'],
    distance: 1.5
  },
  {
    id: '3',
    name: 'Green Garden',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    rating: 4.5,
    deliveryTime: 30,
    costForTwo: 350,
    cuisine: ['South Indian', 'Vegetarian', 'Healthy'],
    isVeg: true,
    offers: ['20% OFF'],
    distance: 3.2
  },
  {
    id: '4',
    name: 'Burger Junction',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
    rating: 4.0,
    deliveryTime: 20,
    costForTwo: 300,
    cuisine: ['Burgers', 'American', 'Fast Food'],
    isVeg: false,
    offers: ['Free Delivery'],
    distance: 1.8
  },
  {
    id: '5',
    name: 'Dosa Corner',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400',
    rating: 4.2,
    deliveryTime: 28,
    costForTwo: 250,
    cuisine: ['South Indian', 'Dosa', 'Breakfast'],
    isVeg: true,
    offers: ['30% OFF up to ₹75'],
    distance: 2.5
  },
  {
    id: '6',
    name: 'Tandoor Express',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    rating: 4.4,
    deliveryTime: 40,
    costForTwo: 500,
    cuisine: ['North Indian', 'Tandoor', 'Punjabi'],
    isVeg: false,
    offers: ['₹125 OFF above ₹499'],
    distance: 4.1
  },
  {
    id: '7',
    name: 'Sweet Treats',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    rating: 4.6,
    deliveryTime: 15,
    costForTwo: 200,
    cuisine: ['Desserts', 'Ice Cream', 'Sweets'],
    isVeg: true,
    offers: ['Buy 2 Get 1 Free'],
    distance: 1.2
  },
  {
    id: '8',
    name: 'Chinese Dragon',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400',
    rating: 3.9,
    deliveryTime: 35,
    costForTwo: 450,
    cuisine: ['Chinese', 'Asian', 'Noodles'],
    isVeg: false,
    offers: ['40% OFF up to ₹80'],
    distance: 3.8
  }
]