import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '@/app/context/CartContext';
import { OrderService } from '@/app/service/OrderService';
import { useAuth } from '@/app/context/AuthContext';
 

const CheckoutScreen = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);  
  const { user, token, loading, login, logout } = useAuth();
  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [fees, setFees] = useState(0); // Flat fees as an example
  const [total, setTotal] = useState(0);

  const taxRate = 0.08; // 8% tax

  const navigation = useNavigation();

  // Update calculations whenever cartTotal changes
  useEffect(() => {
    setSubtotal(cartTotal);
    const calculatedTaxes = cartTotal * taxRate;
    setTaxes(calculatedTaxes);
    setTotal(cartTotal + calculatedTaxes + fees);
  }, [cartTotal, fees]);

  const handleBackToCart = () => {
    navigation.goBack();
  };

  const handlePlaceOrder = async () => {
    if(user === null) {
        console.log("user isn't logged in / doesn't exist");
        return false;
        
    }

    const orderService = new OrderService("http://ec2-13-58-26-172.us-east-2.compute.amazonaws.com:8080");
    // Implement your order placement logic
    try {
        orderService.placeOrder(token, user.uid, cartItems);
    } catch (error) {
        console.error('Error placing order:', error);
        // Optionally show an error message to the user
      }
    console.log('Order placed!');
    clearCart();

    //Resets the shop stack so next time you look at it, it's on the shop page. Also navigates user to the orders page
    navigation.reset({
      index: 0,
      routes: [{ name: 'Orders' }],
    });


  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      
      <View style={styles.summaryContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal:</Text>
          <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Taxes:</Text>
          <Text style={styles.value}>${taxes.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Fees:</Text>
          <Text style={styles.value}>${fees.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={handleBackToCart}>
        <Text style={styles.backButtonText}>Back to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 18,
    color: '#555',
  },
  value: {
    fontSize: 18,
    color: '#333',
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  placeOrderButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  placeOrderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#777',
    paddingVertical: 14,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default CheckoutScreen;
