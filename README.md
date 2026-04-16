# ShopApp 🛍️

A full-featured React Native e-commerce app built with Expo.

## Features
- 🏠 Home Screen with banner carousel, category filters, product grid
- 🔍 Live search across products
- 📦 Product Detail with size/color selection, wishlist
- 🛒 Cart with quantity management, savings summary, order placement
- 👤 Profile screen with order history, settings, notifications toggle
- 🔔 Cart badge with live item count

## Tech Stack
- React Native + Expo (~50)
- React Navigation (Bottom Tabs + Native Stack)
- React Context API (Cart state management)
- @expo/vector-icons (Ionicons)

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npx expo start

# 3. Scan the QR code with Expo Go app on your phone
#    OR press 'a' for Android emulator / 'i' for iOS simulator
```

## Project Structure

```
ShopApp/
├── App.js                          # Entry point
├── src/
│   ├── context/
│   │   └── CartContext.js          # Global cart state
│   ├── data/
│   │   └── products.js             # Product data & categories
│   ├── components/
│   │   └── ProductCard.js          # Reusable product card
│   ├── navigation/
│   │   └── AppNavigator.js         # Tab + Stack navigation
│   └── screens/
│       ├── HomeScreen.js           # Product listing + search
│       ├── ProductDetailScreen.js  # Product info + add to cart
│       ├── CartScreen.js           # Cart management + checkout
│       └── ProfileScreen.js        # User profile + settings
```

## Customization
- Replace product data in `src/data/products.js` with your API
- Update colors in component StyleSheets (primary: `#7C3AED`)
- Add real authentication in `ProfileScreen.js`
- Integrate payment gateway in `CartScreen.js` checkout flow
