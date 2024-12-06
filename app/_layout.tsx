import { ProductProvider } from '@/app/context/ProductContext';
import { CartProvider } from './context/CartContext';
import { Stack } from 'expo-router';
import Cart from './(tabs)/pages/CartPage';

export default function RootLayout() {
  return (
    <ProductProvider>
      <CartProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </CartProvider>
    </ProductProvider>

  );
}
