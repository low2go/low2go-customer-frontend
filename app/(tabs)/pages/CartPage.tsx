import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Cart = () => {
  return (
    <View style={styles.container}>
      <Text>Your Cart</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Cart;
