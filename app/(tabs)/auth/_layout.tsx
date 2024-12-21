import React from 'react';

import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

export default function AuthLayout() {
  return (
    <Stack.Navigator  >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ title: 'Login' , headerShown: false}} 
      />
      <Stack.Screen 
        name="Sign Up" 
        component={SignUpScreen} 
        options={{ title: 'Sign Up', headerShown: false }} 
      />
    </Stack.Navigator>
  );
}
