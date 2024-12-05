import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CartIcon = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("CartScreen"); // Navigate to the cart screen
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Ionicons name="cart" size={24} color="#333" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 16, // Aligns the icon with the header's right edge
  },
});

export default CartIcon;
