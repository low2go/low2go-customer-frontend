import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import ShopScreen from '.';
import ItemDetailScreen from './ItemDetail';
import Cart from '../pages/CartPage';
import SpecificSearch from '../pages/SpecificSearch';
import Header from '@/app/components/Header';
import { ProductContext, ProductContextType } from '@/app/context/ProductContext';

const ShopStack = createStackNavigator();

export default function ShopLayout() {
  const { products, loading, error, fetchProducts } =
    useContext<ProductContextType>(ProductContext);

  return (
    <ShopStack.Navigator>
      {/* Root screen with a custom header */}
      <ShopStack.Screen
        name="Shop"
        component={ShopScreen} 
        options={({ navigation }) => ({
          header: () => <Header navigation={navigation} />, // Custom Header for Shop
        })}
        initialParams={{ products, loading, error, fetchProducts }}
      />

      {/* Item Detail screen with no header */}
      <ShopStack.Screen
        name="Item Detail"
        component={ItemDetailScreen}
        options={{
          headerShown: false, // No header for this screen
        }}
      />

      {/* Cart Page with no header */}
      <ShopStack.Screen
        name="Cart Page"
        component={Cart}
        options={{
          // headerShown: false, // No header for this screen
        }}
      />
      <ShopStack.Screen
        name="Specific Search"
        component={SpecificSearch}
        options={({ navigation }) => ({
          header: () => <Header navigation={navigation} />, // Custom Header for Specific Search
        })}
      />
    </ShopStack.Navigator>
  );
}
