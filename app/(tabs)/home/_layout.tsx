import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '@/app/components/Header'; // Custom header component
import SpecificSearch from '../pages/SpecificSearch'; // Specific Search component
import Index from '..';
import CartScreen from '../pages/CartPage';
import CheckoutScreen from '../pages/Checkout';

const Stack = createStackNavigator();

export default function HomeLayout() {
  return (
<Stack.Navigator>
  <Stack.Screen
    name="Orders"
    component={Index}
    options={({ navigation }) => ({
      header: () => <Header navigation={navigation} />, // Custom header for Orders
    })}
  />

  <Stack.Screen
    name="Specific Search"
    component={SpecificSearch}
    options={({ navigation }) => ({
      header: () => <Header navigation={navigation} showBackButton={true} />, // Custom header for Specific Search
    })}
  />

  <Stack.Screen name="Cart Page" component={CartScreen} />
  <Stack.Screen name="Checkout" component={CheckoutScreen} />


</Stack.Navigator>

  );
}
