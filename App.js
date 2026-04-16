import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './src/context/CartContext';
import { WishlistProvider } from './src/context/WishlistContext';
import { OrderProvider } from './src/context/OrderContext';
import AppNavigator from './src/navigation/AppNavigator';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("=== REACT NATIVE FATAL CRASH ===");
    console.error(error);
    console.error(errorInfo.componentStack);
    console.error("=================================");
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, paddingTop: 60, paddingHorizontal: 20, backgroundColor: '#fff' }}>
          <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Application Crashed!</Text>
          <Text style={{ marginBottom: 10, fontWeight: '600' }}>Please check your Expo Terminal for the full error.</Text>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={{ color: '#333', fontWeight: 'bold' }}>{this.state.error?.toString()}</Text>
            <Text style={{ marginTop: 10, fontSize: 11, fontFamily: 'Courier' }}>{this.state.error?.stack}</Text>
          </ScrollView>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <OrderProvider>
          <WishlistProvider>
            <CartProvider>
              <NavigationContainer>
                <StatusBar style="dark" />
                <AppNavigator />
              </NavigationContainer>
            </CartProvider>
          </WishlistProvider>
        </OrderProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
