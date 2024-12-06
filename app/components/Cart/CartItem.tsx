import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ProductContext } from '@/app/context/ProductContext'; // Ensure the correct path
import { Colors } from '@/app/constants/colors';

type CartItemProps = {
  productId: string;
  quantity: number;
};

const CartItem = ({ productId, quantity }: CartItemProps) => {
  const { products } = useContext(ProductContext); // Access products from the ProductContext
  const product = products.find(item => item.productId === productId);

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  const { name, price, imageUrl } = product;

console.log(name);      // 'T-Shirt'
console.log(price);     // 29.99
console.log(imageUrl);  // 'https://example.com/image.jpg'


  return (
    <View style={styles.cartItem}>
      {/* Product Image */}
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image} 
        onError={() => console.warn(`Failed to load image: ${imageUrl}`)} 
      />
      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.nameText} numberOfLines={1}>{name}</Text>
        <Text style={styles.priceText}>Price: ${price.toFixed(2)}</Text>
        <Text style={styles.quantityText}>Quantity: {quantity}</Text>
        <Text style={styles.totalPriceText}>Total: ${(price * quantity).toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    cartItem: {
      flexDirection: 'row', // Image and text side-by-side
      alignItems: 'center',
      padding: 10,
      marginVertical: 8,
      backgroundColor: 'white',
      borderRadius: 10,
      elevation: 3, // Shadow on Android
      shadowColor: '#000', // Shadow on iOS
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      width: '100%', // Take most of the screen width
      alignSelf: 'center', // Center within FlatList
    },
    image: {
      width: 80, // Fixed width
      height: 80, // Fixed height
      resizeMode: 'contain',
      borderRadius: 10,
      marginRight: 10, // Add spacing between image and text
    },
    textContainer: {
      flex: 1, // Text container takes remaining space
    },
    nameText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    priceText: {
      fontSize: 14,
      color: '#777',
      marginTop: 4,
    },
    quantityText: {
      fontSize: 14,
      color: '#555',
      marginTop: 4,
    },
    totalPriceText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#111',
      marginTop: 4,
    },
    detailsContainer: {

        justifyContent: 'space-between', // Spread details evenly
      },
    
  });
  

export default CartItem;
