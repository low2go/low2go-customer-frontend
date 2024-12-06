import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity, Text } from 'react-native';
import ShopLayout from './shop/_layout';
import Index from '.';
import Orders from './orders';
import Profile from './profile/profile';
import CartIcon from '@/app/components/CartIcon'; // Your cart icon component
import Cart from './pages/CartPage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 5 }}
          >
            <CartIcon /> 
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen name="Home" component={Index} />
      <Tab.Screen name="Shop" component={ShopLayout} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={TabLayout} options={{ headerShown: false }} />
      <Stack.Screen name="Cart Page" component={Cart} />
    </Stack.Navigator>
  );
}

