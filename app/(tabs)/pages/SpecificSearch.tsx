import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import GridItem from '@/app/components/List/GridItem';
import { Colors } from '@/app/constants/colors';
import { useNavigation } from 'expo-router';
import SortButton from '@/app/components/Search/SortButton';
import { Product } from '@/app/context/ProductContext';

const SpecificSearch = ({ route }) => {
  const { products, query, loading, error } = route.params;
  const [sortOrder, setSortOrder] = useState<string>('price_asc'); 

  const navigation = useNavigation();

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
  const sortedProducts = 
    products && products.length > 0 
      ? [...products].sort((a, b) => {
          switch (sortOrder) {
            case 'price_asc':
              return a.price - b.price; 
            case 'price_desc':
              return b.price - a.price; 
            case 'name_asc':
              return a.name.localeCompare(b.name); 
            case 'name_desc':
              return b.name.localeCompare(a.name); 
            default:
              return 0;
          }
        })
      : []; 

  // Function to handle sorting option passed from SortButton
  const handleSelectOption = (selectedSortOrder: string) => {
    setSortOrder(selectedSortOrder); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search Results for "{query}"</Text>

      <View>
        <SortButton onSortSelect={handleSelectOption} />
      </View>

      {/* List of Products */}
      <FlashList
        data={sortedProducts} 
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

export default SpecificSearch;
