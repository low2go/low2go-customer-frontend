import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import GridItem from '@/app/components/List/GridItem';
import { Colors } from '@/app/constants/colors';
import { useNavigation } from 'expo-router';
import SortButton from '@/app/components/Search/SortButton';

const ShopScreen = ({ route }) => {
  const { products, loading, error, fetchProducts } = route.params;
  const [sortOrder, setSortOrder] = useState<string>('price_asc');  // Default sorting by price ascending

  const navigation = useNavigation();

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

  // Function to sort the products based on the selected sort order
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOrder) {
      case 'price_asc':
        return a.price - b.price; // Ascending order by price
      case 'price_desc':
        return b.price - a.price; // Descending order by price
      case 'name_asc':
        return a.name.localeCompare(b.name); // Ascending order by name
      case 'name_desc':
        return b.name.localeCompare(a.name); // Descending order by name
      default:
        return 0;
    }
  });

  // Function to handle sorting option passed from SortButton
  const handleSelectOption = (selectedSortOrder: string) => {
    setSortOrder(selectedSortOrder); // Update the sortOrder state
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shop</Text>

      <View>
        <SortButton onSortSelect={handleSelectOption} />
      </View>

      {/* List of Products */}
      <FlashList
        data={sortedProducts}  // Use the sorted products
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

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,

  },
  header: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  text: {
    color: Colors.text,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ShopScreen;
