import { Tabs } from 'expo-router';
import { TabBar } from '@/app/components/TabBar';
import CartIcon from '@/app/components/CartIcon'; // Adjust the import path if needed

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home', 
          headerShown: true, // Show header
          headerRight: () => <CartIcon />, // Add CartIcon in the header
        }} 
      />
      <Tabs.Screen 
        name="shop" 
        options={{ 
          title: 'Shop', 
          headerShown: true,
          headerRight: () => <CartIcon />,
        }} 
      />
      <Tabs.Screen 
        name="orders" 
        options={{ 
          title: 'Orders',
          headerShown: true,
          headerRight: () => <CartIcon />,
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
          headerShown: true,
          headerRight: () => <CartIcon />,
        }} 
      />
    </Tabs>
  );
}
