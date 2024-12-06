import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { CartContext } from '@/app/context/CartContext';
import CartItem from '@/app/components/Cart/CartItem';

const CartScreen = () => {
  const { cartItems } = useContext(CartContext);

  const renderItem = ({ item }: any) => (
    <CartItem productId={item.productId} quantity={item.quantity} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.productId}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#f9f9f9', // Light background color
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#333',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});

export default CartScreen;
