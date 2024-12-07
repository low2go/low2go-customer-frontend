import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartContext } from '@/app/context/CartContext'; // Import CartContext
import { Colors } from '@/app/constants/colors';
import { Product } from '@/app/context/ProductContext';
import { ScrollView } from 'react-native-gesture-handler';

const ItemDetailScreen = () => {
  const route = useRoute();
  const { product } = route.params;

  const { addToCart } = useContext(CartContext); // Access CartContext

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    // Prevent incrementing beyond the available stock
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    // Prevent decrementing below 1
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product.productId, quantity); // Add the item to cart with quantity 1
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => product.navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Image source={{ uri: product.imageUrl }} style={styles.image} />

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.stock}>Stock Available: {product.stock}</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut urna
          vel lacus fermentum volutpat. {/* Placeholder description */}
        </Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
            <Ionicons name="remove" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  stock: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  quantityButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 8,
  },
  quantityInput: {
    width: 50,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    borderRadius: 5,
    fontSize: 18,
    color: '#333',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    width: 30,
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 30, // Adjust for safe area (status bar)
    left: 20,
    backgroundColor: Colors.primary, // Background color for better visibility
    borderRadius: 20,
    padding: 10,
    zIndex: 1, // Ensures it floats above other content
  },
});

export default ItemDetailScreen;
