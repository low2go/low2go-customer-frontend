import { Stack , Tabs} from "expo-router";
import React from "react";
import { View, Text } from "react-native";

export default function _layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home"
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop"
        }}
      />      
      <Tabs.Screen
        name="order"
        options={{
          title: "Order"
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile"
        }}
      />            
    </Tabs>
    
  )
}
