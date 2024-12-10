import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../context/CartContext';

const CartIcon = () => {
  const navigation = useNavigation();
  const { cartCount } = useContext(CartContext);

  const handlePress = () => {
    navigation.navigate("Cart Page"); // Navigate to the cart screen
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Ionicons name="cart" size={30} color="#333" />
      {cartCount > 0 && ( // Only show the badge if there are items in the cart
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative', // Required for positioning the badge
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CartIcon;
