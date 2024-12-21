import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './profile';
import AuthLayout from '../auth/_layout';


const Stack = createStackNavigator();

export default function ProfileLayout() {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name="Auth"
        component={AuthLayout}
        options={{ headerShown: false }} 

      />
      <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{ title: 'Profile' }} 
      />

    </Stack.Navigator>
  );
}
