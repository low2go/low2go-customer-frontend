import { createStackNavigator } from '@react-navigation/stack';
import { Stack } from 'expo-router';
import React from 'react';
import ShopScreen from '.';
import ItemDetailScreen from './ItemDetail'; 
import Cart from '../pages/CartPage';
import SpecificSearch from '../pages/SpecificSearch';
import { ProductContext, ProductContextType } from '@/app/context/ProductContext';
import { useContext } from 'react';


const ShopStack = createStackNavigator();



export default function ShopLayout() {

  const { products, loading, error, fetchProducts } = useContext<ProductContextType>(ProductContext);

  return (
    <ShopStack.Navigator>
      <ShopStack.Screen 
        name="Shop" 
        component={ShopScreen}  
        options={{ headerShown: false }}
        initialParams={{ products, loading, error, fetchProducts }} 
      />      
      <ShopStack.Screen name="Item Detail" component={ItemDetailScreen}  options={{headerShown: false}} />
      <ShopStack.Screen name="Cart Page" component={Cart} options={{headerShown: false}}/>
    </ShopStack.Navigator>
  );
}
