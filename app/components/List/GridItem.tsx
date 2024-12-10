import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Colors } from '@/app/constants/colors';
import { CartContext } from '@/app/context/CartContext';
import { CartItemObj } from '@/app/context/CartContext';

type GridItemProps = {
  productId: string;
  name: string; 
  stock: number;
  price: number;
  imageUrl: string;
  navigation: NavigationProp<any>;
};

const GridItem = ({ name, productId, stock, price, imageUrl, navigation }: GridItemProps) => {

  const { addToCart, removeFromCart, cartItems } = useContext(CartContext); // Access CartContext
  const getCartItemQuantity: (productId: string) => number | undefined = (productId) => {
    const cartItem = cartItems.find((item) => item.productId === productId);
    return cartItem ? cartItem.quantity : 0;
  }; 
  
  const gridItemQuantity = getCartItemQuantity(productId);

  const [quantity, setQuantity] = useState(gridItemQuantity);

  const handleAddToCart = () => {
    addToCart(productId, quantity || 1); // Add the item with at least a quantity of 1
    setQuantity(1); // Ensure quantity reflects the addition
  };

  const incrementQuantity = () => {
    // Prevent incrementing beyond the available stock
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
      addToCart(productId, 1);
    }
  };

  useEffect(() => {
    setQuantity(getCartItemQuantity(productId));
  }, [cartItems, productId]);
  

  const decrementQuantity = () => {
    // Prevent decrementing below 1
      setQuantity((prev) => prev - 1);
      removeFromCart(productId, 1);
    
  };

  const handlePress = () =>
    navigation.navigate('Item Detail', {
      product: { name, productId, stock, price, imageUrl, navigation },
  });

  return (
    <View style={styles.gridItem}>
      <TouchableOpacity style={styles.gridItemClickableArea} onPress={handlePress} activeOpacity={0.8}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            onError={() => console.warn(`Failed to load image: ${imageUrl}`)}
          />
          <View style={styles.textContainer}>
            <Text style={styles.priceText}>${price.toFixed(2)}</Text>
            <Text style={styles.itemText} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.stockText}>Stock: {stock}</Text>
          </View>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.favoriteButton} onPress={() => console.log('Favorite pressed')}>
          <Text style={styles.favoriteButtonText}>Favorite</Text>
        </TouchableOpacity>
        {quantity === 0 ? (
          <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
            <Text style={styles.cartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.counterButton}>
            <TouchableOpacity onPress={decrementQuantity}>
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.cartButtonText}>{quantity}</Text>
            <TouchableOpacity onPress={incrementQuantity}>
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    backgroundColor: '#f8f8f8', // Neutral background for better contrast

  },
  gridItemClickableArea: {
    flexDirection: 'row', // Lay items horizontally
    overflow: 'hidden', // Clip content inside the border radius
    alignItems: 'center', // Center items vertically

  },
  image: {
    width: '45%', // Image takes up 45% of the container's width
    height: 180, // Fixed height to maintain aspect ratio
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10, // Smooth corners for the left side of the image
  },
  textContainer: {
    width: '55%', // Text container takes up 55% of the container's width
    height: '100%',
    padding: 15, // Spacing inside the text container
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  itemText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
    marginVertical: 2,
  },
  stockText: {
    fontSize: 12,
    color: Colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    marginTop: 10,
  },
  cartButton: {
    flex: 1, // Each button takes equal width
    backgroundColor: Colors.primary, // Use your preferred color
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  favoriteButton: {
    flex: 1, // Each button takes equal width
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
  },
  favoriteButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },  
  counterButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1, // Each button takes equal width
    backgroundColor: Colors.primary, // Use your preferred color
    borderRadius: 20,
    alignItems: 'center',
    gap: 40,
  },
  counterText: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 3,
    fontWeight: '600',
  }
  
});

export default GridItem;
