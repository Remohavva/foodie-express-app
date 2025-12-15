# FoodieExpress - Food Delivery App Frontend

A complete, pixel-perfect frontend clone of a popular Indian food delivery application built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Pages
- **Landing/Home Page** - Hero section, categories, restaurant listings, offers carousel
- **Authentication** - Login, Signup, OTP verification with form validation
- **Restaurant Listing** - Advanced filters, sorting, grid/list view
- **Restaurant Detail** - Menu browsing, categories, search, add to cart
- **Search** - Global search for restaurants and dishes
- **Cart** - Item management, quantity controls, bill calculation
- **Checkout** - Address selection, payment options, order summary
- **Order Success** - Confirmation with tracking info
- **Profile** - User info, statistics, quick actions
- **Orders History** - Order tracking, reorder functionality
- **Help & Support** - FAQ, contact options, live chat UI

### Technical Features
- **Responsive Design** - Mobile-first approach with perfect desktop experience
- **State Management** - Zustand for cart and user data with persistence
- **Modern UI Components** - Custom components with shadcn/ui patterns
- **Animations** - Smooth transitions with Framer Motion
- **TypeScript** - Full type safety throughout the application
- **Mock Data** - Realistic restaurant and menu data
- **Loading States** - Skeleton loaders and loading indicators
- **Error Handling** - Proper error states and validation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components + shadcn/ui patterns
- **Icons**: Lucide React
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Images**: Next/Image optimization

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── restaurant/        # Restaurant detail pages
│   ├── restaurants/       # Restaurant listing
│   ├── search/           # Search functionality
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Checkout process
│   ├── orders/           # Order history
│   ├── profile/          # User profile
│   └── help/             # Help & support
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   └── layout/           # Layout components
├── sections/             # Page sections
├── lib/                  # Utilities and types
├── data/                 # Mock data
└── styles/               # Global styles
```

## 🎨 Design Features

- **Swiggy-inspired** color scheme and typography
- **Mobile-first** responsive design
- **Smooth animations** and micro-interactions
- **Consistent spacing** and visual hierarchy
- **Accessible** components with proper ARIA labels
- **Loading states** and skeleton screens
- **Empty states** and error handling

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd food-delivery-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages Overview

### 1. Home Page (`/`)
- Hero section with search functionality
- Offers carousel
- Food categories grid
- Top-rated and nearby restaurants

### 2. Authentication (`/auth/*`)
- **Login** (`/auth/login`) - Email/password with social login options
- **Signup** (`/auth/signup`) - Registration form with validation
- **OTP Verification** (`/auth/verify-otp`) - Phone number verification

### 3. Restaurant Listing (`/restaurants`)
- Advanced filtering (rating, delivery time, cost, cuisine)
- Sorting options (relevance, rating, distance, cost)
- Grid and list view modes
- Real-time search and filtering

### 4. Restaurant Detail (`/restaurant/[id]`)
- Restaurant information and images
- Menu categories and items
- Search within menu
- Add to cart functionality
- Veg/Non-veg filters

### 5. Search (`/search`)
- Global search for restaurants and dishes
- Recent and trending searches
- Real-time search results
- Separate results for restaurants and dishes

### 6. Cart (`/cart`)
- Item management with quantity controls
- Price calculations with taxes and delivery
- Promo code application
- Empty cart state

### 7. Checkout (`/checkout`)
- Address selection and management
- Payment method selection (UPI, Card, COD)
- Order summary and final review
- Delivery instructions

### 8. Order Success (`/order-success`)
- Order confirmation with animation
- Delivery tracking information
- Contact options for support
- Social sharing options

### 9. Profile (`/profile`)
- Personal information management
- Account statistics
- Quick action menu
- Recent activity feed

### 10. Orders (`/orders`)
- Order history with filtering
- Real-time order tracking
- Reorder functionality
- Rating and review options

### 11. Help & Support (`/help`)
- Comprehensive FAQ section
- Multiple contact options
- Search functionality
- Category-wise organization

## 🎯 Key Features Implemented

### State Management
- **Cart Management**: Add, remove, update quantities
- **User Data**: Profile, addresses, preferences
- **Persistent Storage**: Cart and user data persist across sessions

### UI/UX Excellence
- **Responsive Design**: Perfect on all screen sizes
- **Loading States**: Skeleton loaders for better UX
- **Error Handling**: Graceful error states and validation
- **Animations**: Smooth transitions and micro-interactions

### Mock Data & Simulation
- **Realistic Data**: Restaurant menus, user profiles, orders
- **API Simulation**: Delayed responses to simulate real API calls
- **Dynamic Content**: Search, filtering, and sorting work with mock data

## 🔧 Customization

### Adding New Restaurants
Edit `src/data/restaurants.ts` to add new restaurant data.

### Adding Menu Items
Edit `src/data/menu.ts` to add items for specific restaurants.

### Styling Changes
- Colors: Modify `tailwind.config.ts`
- Components: Update component files in `src/components/`
- Global styles: Edit `src/app/globals.css`

## 📦 Build & Deployment

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational and portfolio purposes.

## 🙏 Acknowledgments

- Design inspiration from Swiggy and similar food delivery apps
- Icons from Lucide React
- Images from Unsplash
- UI patterns from shadcn/ui

---

**Note**: This is a frontend-only implementation with mock data. No backend services are included.