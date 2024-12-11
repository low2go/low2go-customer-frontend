import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ProductContext } from '@/app/context/ProductContext'; // Ensure the correct path
import { Colors } from '@/app/constants/colors';
import { CartContext } from '@/app/context/CartContext';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you use a supported icon pack
import ItemQuantity from './ItemQuantity';


type CartItemProps = {
  productId: string;
  quantity: number;
};

const CartItem = ({ productId, quantity }: CartItemProps) => {
  const { products } = useContext(ProductContext); // Access products from the ProductContext
  const {removeFromCart, addToCart} = useContext(CartContext);
  const product = products.find(item => item.productId === productId);

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  const { name, price, imageUrl } = product;



  return (
    <View style={styles.cartItem}>
      {/* Product Image */}
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image} 
        onError={() => console.warn(`Failed to load image: ${imageUrl}`)} 
      />
      {/* Product Details */}
      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.nameText} numberOfLines={1}>{name}</Text>
        <Text style={styles.priceText}>Price: ${price.toFixed(2)}</Text>
        <Text style={styles.totalPriceText}>Total: ${(price * quantity).toFixed(2)}</Text>

        {/* Quantity Controls */}
        <ItemQuantity 
          productId={productId}
          quantity={quantity}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      </View>

      

      <TouchableOpacity
        style={styles.trashButton}
        onPress={() => removeFromCart(productId, quantity)}
      >
        <Icon name="delete" size={24} color="#ff5252" />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
    cartItem: {
      flexDirection: 'row', // Image, text, and button side-by-side
      alignItems: 'center',
      padding: 10,
      marginVertical: 4,
      backgroundColor: 'white',
      borderRadius: 10,
      elevation: 2, // Shadow on Android
      shadowColor: '#000', // Shadow on iOS
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    image: {
      width: 80,
      height: 80,
      resizeMode: 'contain',
      borderRadius: 10,
      marginRight: 10,
    },
    detailsContainer: {
      flex: 1, // Text container takes up remaining space
      justifyContent: 'space-between',
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
    totalPriceText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#111',
      marginTop: 4,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    quantityText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginHorizontal: 8,
    },
    quantityButton: {
      padding: 6,
      borderRadius: 4,
    },
    trashButton: {
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      padding: 16,
      backgroundColor: '#f8d7da',
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    errorText: {
      color: '#721c24',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });

export default CartItem;
