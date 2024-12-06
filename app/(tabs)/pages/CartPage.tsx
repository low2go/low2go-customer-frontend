import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { CartContext } from '@/app/context/CartContext'; // Import the CartContext
import CartItem from '@/app/components/Cart/CartItem';

const Cart = () => {
  const { cartItems, loading, error } = useContext(CartContext); // Consume the CartContext

  // If data is loading or there's an error, display a loading or error message
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  // // Render the cart items using FlatList for performance optimization
  // const renderItem = ({ item }: { item: { productId: string, quantity: number } }) => (
  //   <View style={styles.itemContainer}>
  //     <Text>Product ID: {item.productId}</Text>
  //     <Text>Quantity: {item.quantity}</Text>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <Text>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.productId} // Unique key for each item
          renderItem={({ item }) => (
            <CartItem
              productId={item.productId}
              quantity={item.quantity}
      />
    )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
  },
});

export default Cart;
