# Food Delivery App

A modern React Native food delivery application built with Expo, featuring a clean UI, seamless payment integration, and real-time order tracking.

## 📱 Features

- **Browse Menu**: Explore various food categories including burgers, pizzas, burritos, sandwiches, wraps, and bowls
- **Food Customization**: Add toppings, sides, and customize your orders
- **Cart Management**: Add, remove, and modify items in your cart
- **Secure Payments**: Integrated Stripe payment processing
- **Order Tracking**: Real-time order status updates and delivery tracking
- **User Authentication**: Sign up and sign in functionality with Appwrite
- **Search & Filter**: Find your favorite foods quickly
- **Responsive Design**: Optimized for both iOS and Android devices

## 🛠️ Tech Stack

- **Frontend**: React Native with Expo
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: Expo Router with file-based routing
- **State Management**: Zustand for cart and auth state
- **Backend**: Appwrite for database and authentication
- **Payments**: Stripe React Native SDK
- **Icons & Images**: Expo Vector Icons and custom assets

## 📸 Screenshots

<div align="center">
  <img src="./assets/images/screenshot1.png" alt="Home Screen" width="200"/>
  <img src="./assets/images/screenshot2.png" alt="Food Detail" width="200"/>
  <img src="./assets/images/screenshot3.png" alt="Cart" width="200"/>
  <img src="./assets/images/screenshot4.png" alt="Checkout" width="200"/>
  <img src="./assets/images/screenshot5.png" alt="Order Confirmation" width="200"/>
</div>

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)
- Expo Go app on your physical device (optional)

### Installation

1. **Clone the repository and install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   Create a `.env` file in the root directory and add your API keys:

   ```env
   EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
   EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run on your preferred platform**

   In the output, you'll find options to open the app in:
   - [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - [Expo Go](https://expo.dev/go) app on your physical device

## 📁 Project Structure

```
├── app/                    # Main app screens (file-based routing)
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Tab-based screens
│   ├── food-detail/       # Food detail screens
│   ├── checkout.tsx       # Checkout screen
│   └── order-confirmation.tsx
├── components/            # Reusable UI components
├── lib/                   # Utilities and services
│   ├── appwrite.ts       # Appwrite configuration
│   ├── stripe.ts         # Stripe payment service
│   └── data.ts           # Sample data
├── store/                # State management
├── assets/               # Images, icons, and fonts
└── constants/            # App constants
```

## 🔧 Configuration

### Appwrite Setup

1. Create an Appwrite project at [appwrite.io](https://appwrite.io)
2. Set up the following collections:
   - Users
   - Categories
   - Menu Items
   - Customizations
3. Update the `appwriteConfig` in `lib/appwrite.ts` with your database and collection IDs

### Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
3. Add your publishable key to the environment variables
4. Set up a backend server for handling payment intents (see `README_STRIPE_SETUP.md`)

## 📱 App Screens

- **Home**: Browse featured items and categories
- **Search**: Search and filter menu items
- **Food Detail**: View item details and add customizations
- **Cart**: Review selected items and quantities
- **Checkout**: Complete payment and order
- **Order Confirmation**: Track order status
- **Profile**: User account and settings
- **Authentication**: Sign in/up screens

## 🎨 Customization

The app uses NativeWind for styling, which allows you to use Tailwind CSS classes in React Native. You can customize the theme in `tailwind.config.js`.

## 🚀 Deployment

This app can be deployed using:
- **Expo Application Services (EAS)** for app store deployment
- **Expo Web** for web deployment
- **Replit** for development and testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev)
- UI inspired by modern food delivery apps
- Icons and assets created for this project
