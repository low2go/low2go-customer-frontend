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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        header: () => (
          <SafeAreaView style={styles.headerContainer}>
            {/* ProductSearch Component */}
            <ProductSearch navigation={navigation} />

            {/* Cart Icon */}
            <TouchableOpacity onPress={() => navigation.navigate("Cart Page")} style={styles.cartIconContainer}>
              <CartIcon />
            </TouchableOpacity>
          </SafeAreaView>
        ),
      })}
      tabBar={(props) => <TabBar {...props} />} // Use your custom TabBar component here
    >
      <Tab.Screen name="Home" component={Index} />
      <Tab.Screen name="Shop" component={ShopLayout} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 15, 
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
      <Stack.Screen name="Specific Search" component={SpecificSearch}/>

    </Stack.Navigator>
  );
}
