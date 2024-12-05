import { createStackNavigator } from '@react-navigation/stack';
import { Tabs } from 'expo-router';
import { TabBar } from '@/app/components/TabBar';
import CartIcon from '@/app/components/CartIcon'; // Your cart icon
import CartScreen from './cart/CartScreen';


const Stack = createStackNavigator();

function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home', 
          headerShown: true,
          headerRight: () => <CartIcon />, // Add CartIcon to the header
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


export default TabLayout;
