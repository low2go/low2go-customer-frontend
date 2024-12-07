import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you're using a valid icon pack

type ItemQuantityProps = {
  productId: string;
  quantity: number;
  addToCart: (productId: string, amount: number) => void;
  removeFromCart: (productId: string, amount: number) => void;
};

const ItemQuantity = ({
  productId,
  quantity,
  addToCart,
  removeFromCart,
}: ItemQuantityProps) => {
  const [manualQuantity, setManualQuantity] = useState(quantity.toString());

  const handleManualChange = (value: string) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 1) {
      setManualQuantity(value); // Set the valid manual value
      addToCart(productId, parsedValue - quantity); // Add or remove based on the difference
    } else {
      setManualQuantity(''); // Clear if the value is invalid
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setManualQuantity(newQuantity.toString());
    addToCart(productId, 1); // Increase by 1
  };

  const handleDecrement = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) {
      setManualQuantity(newQuantity.toString());
      removeFromCart(productId, 1); // Decrease by 1
    }
  };

  return (
    <View style={styles.quantityContainer}>
      {/* Decrease Quantity */}
      <TouchableOpacity
        onPress={handleDecrement} // Decrease quantity by 1
        style={styles.quantityButton}
      >
        <Icon name="remove" size={20} color="#ff5252" />
      </TouchableOpacity>

      {/* Manual Input for Quantity */}
      <TextInput
        style={styles.quantityInput}
        keyboardType="numeric"
        value={manualQuantity}
        onChangeText={handleManualChange}
        maxLength={3} // Limit the input length (optional)
      />

      {/* Increase Quantity */}
      <TouchableOpacity
        onPress={handleIncrement} // Increase quantity by 1
        style={styles.quantityButton}
      >
        <Icon name="add" size={20} color="#4caf50" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    padding: 6,
    borderRadius: 4,
  },
  quantityInput: {
    width: 50,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
});

export default ItemQuantity;
