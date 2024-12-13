import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import ShopLayout from './shop/_layout';
import Index from '.';
import Orders from './orders';
import Profile from './profile/profile';
import CartIcon from '@/app/components/CartIcon'; // Your cart icon component
import Cart from './pages/CartPage';
import TabBar from '../components/TabBar';
import ProductSearch from '../components/Search/ProductSearch';
import SpecificSearch from './pages/SpecificSearch';
import Header from '../components/Header';
import HomeLayout from './home/_layout';
import ProfileLayout from './profile/_layout';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabLayout() {
  return (
    <Tab.Navigator

      tabBar={(props) => <TabBar {...props} />} // Use your custom TabBar component here
    >
      <Tab.Screen name="Home" component={HomeLayout} options={{headerShown: false}}/>
      <Tab.Screen name="Shop" component={ShopLayout} options={{headerShown: false}}/>
      <Tab.Screen name="Orders" component={Orders} options={{headerShown: false}} />
      <Tab.Screen name="Profile" component={ProfileLayout} options={{headerShown: false}}/>

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 15,
    justifyContent: 'space-between',
  },
  cartIconContainer: {
    marginLeft: 10, // Space between the search bar and the cart icon
  },
});

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={TabLayout} options={{ headerShown: false }} />
      <Stack.Screen name="Cart Page" component={Cart} />
      <Stack.Screen
        name="Specific Search"
        component={SpecificSearch}
        options={({ navigation }) => ({
          header: () => <Header navigation={navigation} />, // Custom Header for Specific Search
        })}
      />
    </Stack.Navigator>
  );
}
