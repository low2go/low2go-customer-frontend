import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './profile';
import AuthScreen from '../auth/LoginScreen';


const Stack = createStackNavigator();

export default function ProfileLayout() {
  return (
    <Stack.Navigator>

      <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{ title: 'Profile' }} 
      />

    </Stack.Navigator>
  );
}
