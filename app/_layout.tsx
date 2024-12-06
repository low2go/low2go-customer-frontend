import { ProductProvider } from '@/app/context/ProductContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <ProductProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ProductProvider>

  );
}
