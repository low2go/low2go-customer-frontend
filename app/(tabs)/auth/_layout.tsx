import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createBottomTabNavigator();

export default function AuthLayout() {
  return (
    <Stack.Navigator>

      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ title: 'Login' }} 
      />

        <Stack.Screen 
        name="Sign Up" 
        component={SignUpScreen} 
        options={{ title: 'Sign Up' }} 
      />

    </Stack.Navigator>
  );
}
