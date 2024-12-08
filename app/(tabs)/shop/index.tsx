import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import GridItem from '@/app/components/List/GridItem';
import { Colors } from '@/app/constants/colors';
import { ProductContext, ProductContextType } from '@/app/context/ProductContext';
import { useNavigation } from 'expo-router';

const ShopScreen = ({ route }) => {
  const { products, loading, error, fetchProducts } = route.params;
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');  // Add state for sorting order

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products, fetchProducts]);

  // Show loading or error states
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Shop</Text>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Shop</Text>
        <Text style={styles.text}>Error: {error}</Text>
      </View>
    );
  }

  const navigation = useNavigation();

  // Function to toggle sorting order
  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Sort the products based on price
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price; // Ascending order
    } else {
      return b.price - a.price; // Descending order
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shop</Text>

      {/* Sort Button */}
      <TouchableOpacity style={styles.sortButton} onPress={toggleSortOrder}>
        <Text style={styles.sortButtonText}>
          Sort by Price ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </Text>
      </TouchableOpacity>

      {/* List of Products */}
      <FlashList
        data={sortedProducts} // Use the sorted products
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <GridItem
            name={item.name}
            productId={item.productId}
            stock={item.stock}
            price={item.price}
            imageUrl={item.imageUrl}
            navigation={navigation}
          />
        )}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  header: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  sortButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  sortButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
  text: {
    color: Colors.text,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ShopScreen;
