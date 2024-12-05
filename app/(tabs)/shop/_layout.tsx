import { Stack } from 'expo-router';
import React from 'react';

export default function ShopLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Shop' }} />
      <Stack.Screen name="itemDetail" options={{ title: 'Item Detail' }} />

    </Stack>
  );
}
