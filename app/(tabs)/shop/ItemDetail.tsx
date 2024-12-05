import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ItemDetailScreen = () => {
  const route = useRoute();
  const { product } = route.params; // Access the passed item objectß

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Text style={styles.stock}>Stock: {product.stock}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: '#666',
    marginVertical: 8,
  },
  stock: {
    fontSize: 16,
    color: '#999',
  },
});

export default ItemDetailScreen;
