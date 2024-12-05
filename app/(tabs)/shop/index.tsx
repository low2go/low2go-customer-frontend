import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import GridItem from '@/app/components/List/GridItem';
import { Colors } from '@/app/constants/colors';
import { ProductContext, ProductContextType } from '@/app/context/ProductContext';
import { useNavigation } from 'expo-router';

const ShopScreen = () => {
  // Access the context

  const { products, loading, error, fetchProducts } = useContext<ProductContextType>(ProductContext);

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

  const goToItemDetail = () => {
    navigation.navigate('ItemDetail')
  };

  return (
    <View style={styles.container}>
            <TouchableOpacity onPress={goToItemDetail}>
        <Text>Go to Item Detail</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Shop</Text>
      <FlashList
        data={products} // Use products from context
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
            <GridItem
              name={item.name}
              productId={item.productId}
              stock={item.stock}
              price={item.price}
              imageUrl={item.imageUrl}
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
  row: {
    justifyContent: 'space-between',
  },
  text: {
    color: Colors.text,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ShopScreen;
