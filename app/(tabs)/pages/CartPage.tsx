import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { CartContext } from '@/app/context/CartContext';
import CartItem from '@/app/components/Cart/CartItem';

const CartScreen = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

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

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${cartTotal.toFixed(2)}</Text>
      </View>
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
  totalContainer: {
    marginTop: 20, // Space above the total
    padding: 16,
    backgroundColor: '#fff', // Background color for the total section
    borderRadius: 8, // Rounded corners
    shadowColor: '#000', // Add shadow for better visibility
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // Dark text for total
    textAlign: 'center',
  },
});

export default CartScreen;
