import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '@/app/components/Header'; // Custom header component
import SpecificSearch from '../pages/SpecificSearch'; // Specific Search component
import Index from '..';

const Stack = createStackNavigator();

export default function HomeLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Orders" 
        component={Index} 
        options={{ title: 'Home' }} 
      />
      <Stack.Screen
        name="Specific Search"
        component={SpecificSearch}
        options={({ navigation }) => ({
          header: () => <Header navigation={navigation} />, // Custom header for Specific Search
        })}
      />
    </Stack.Navigator>
  );
}
