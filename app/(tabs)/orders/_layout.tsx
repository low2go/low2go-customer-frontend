import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '@/app/components/Header'; // Custom header component
import SpecificSearch from '../pages/SpecificSearch'; // Specific Search component
import Orders from '.';

const Stack = createStackNavigator();

export default function OrdersLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Orders" 
        component={Orders} 
        options={{ title: 'Orders' }} 
      />
      <Stack.Screen
        name="Specific Search"
        component={SpecificSearch}
        options={({ navigation }) => ({
          header: () => <Header navigation={navigation} showBackButton={true}/>, // Custom header for Specific Search
        })}
      />
    </Stack.Navigator>
  );
}
