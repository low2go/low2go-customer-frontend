import { createStackNavigator } from '@react-navigation/stack';
import { Stack } from 'expo-router';
import React from 'react';
import ShopScreen from '.';
import ItemDetailScreen from './ItemDetail'; 
import Cart from '../pages/CartPage';


const ShopStack = createStackNavigator();

export default function ShopLayout() {
  return (
    <ShopStack.Navigator>
      <ShopStack.Screen name="Shop" component={ShopScreen} />
      <ShopStack.Screen name="Item Detail" component={ItemDetailScreen} />
      <ShopStack.Screen name="Cart Page" component={Cart} />
    </ShopStack.Navigator>
  );
}
