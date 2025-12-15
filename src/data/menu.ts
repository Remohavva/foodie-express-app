import { MenuItem } from '@/lib/types'

export const menuItems: { [restaurantId: string]: MenuItem[] } = {
  '1': [ // Biryani Blues
    {
      id: 'm1',
      name: 'Chicken Biryani',
      description: 'Aromatic basmati rice cooked with tender chicken pieces and traditional spices',
      price: 299,
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=300',
      isVeg: false,
      rating: 4.5,
      category: 'Biryani',
      isPopular: true
    },
    {
      id: 'm2',
      name: 'Mutton Biryani',
      description: 'Premium mutton pieces slow-cooked with fragrant basmati rice',
      price: 399,
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=300',
      isVeg: false,
      rating: 4.3,
      category: 'Biryani'
    },
    {
      id: 'm3',
      name: 'Veg Biryani',
      description: 'Mixed vegetables and paneer cooked with aromatic rice and spices',
      price: 249,
      isVeg: true,
      rating: 4.1,
      category: 'Biryani'
    },
    {
      id: 'm4',
      name: 'Chicken Tikka',
      description: 'Marinated chicken pieces grilled to perfection in tandoor',
      price: 199,
      isVeg: false,
      rating: 4.4,
      category: 'Starters'
    }
  ],
  '2': [ // Pizza Palace
    {
      id: 'm5',
      name: 'Margherita Pizza',
      description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil',
      price: 299,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300',
      isVeg: true,
      rating: 4.2,
      category: 'Pizza',
      isPopular: true
    },
    {
      id: 'm6',
      name: 'Pepperoni Pizza',
      description: 'Loaded with pepperoni, mozzarella cheese and tangy tomato sauce',
      price: 399,
      isVeg: false,
      rating: 4.3,
      category: 'Pizza'
    },
    {
      id: 'm7',
      name: 'Veggie Supreme',
      description: 'Bell peppers, onions, mushrooms, olives with cheese',
      price: 349,
      isVeg: true,
      rating: 4.1,
      category: 'Pizza'
    }
  ],
  '3': [ // Green Garden
    {
      id: 'm8',
      name: 'Masala Dosa',
      description: 'Crispy dosa filled with spiced potato curry, served with chutney',
      price: 149,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300',
      isVeg: true,
      rating: 4.4,
      category: 'South Indian',
      isPopular: true
    },
    {
      id: 'm9',
      name: 'Idli Sambar',
      description: 'Steamed rice cakes served with sambar and coconut chutney',
      price: 99,
      isVeg: true,
      rating: 4.2,
      category: 'South Indian'
    },
    {
      id: 'm10',
      name: 'Vada Pav',
      description: 'Mumbai street food - spiced potato fritter in a bun',
      price: 79,
      isVeg: true,
      rating: 4.0,
      category: 'Street Food'
    }
  ]
}