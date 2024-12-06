import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CartContext } from '@/app/context/CartContext'; // Import your CartContext
import { Colors } from '@/app/constants/colors';
import { ProductContext } from '@/app/context/ProductContext';

type CartItemProps = {
  productId: string;
  quantity: number;
};

const CartItem = ({ productId, quantity }: CartItemProps) => {
  // Access product details from CartContext or another context
  const { products, loading, error, fetchProducts } = useContext(ProductContext);
  const product = products.find(item => item.productId === productId);

  if (!product) {
    return null; // If product is not found, don't render anything
  }

  const { name, price, imageUrl } = product;

  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: imageUrl }} style={styles.image} onError={() => console.warn(`Failed to load image: ${imageUrl}`)} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText} numberOfLines={1}>{name}</Text>
        <Text style={styles.priceText}>${price.toFixed(2)}</Text>
        <Text style={styles.quantityText}>Quantity: {quantity}</Text>
        <Text style={styles.totalPriceText}>Total: ${(price * quantity).toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  priceText: {
    fontSize: 16,
    color: Colors.secondary,
    marginVertical: 4,
  },
  quantityText: {
    fontSize: 14,
    color: Colors.primary,
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 8,
  },
});

export default CartItem;
