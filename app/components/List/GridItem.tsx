import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/app/constants/colors';

type GridItemProps = {
  productId: string;
  name: string; 
  stock: number;
  price: number;
  imageUrl: string;
};

const GridItem = ({ name, productId, stock, price, imageUrl }: GridItemProps) => {
  return (
    <View style={styles.gridItem}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image} 
        onError={() => console.warn(`Failed to load image: ${imageUrl}`)} 
      />
      <View style={styles.textContainer}>
        <Text style={styles.priceText}>${price}</Text>
        <Text style={styles.itemText}>{name}</Text>
        <Text style={styles.itemText}>Stock: {stock}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    margin: 5,
    backgroundColor: 'white',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden', // Prevent content overflow
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center', // Center content horizontally
  },
  image: {
    top: 3,
    width: '100%',
    borderRadius: 10,
    height: 120,
    resizeMode: 'contain', // Ensure the image covers the space while maintaining aspect ratio
  },
  textContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  priceText: {
    fontSize: 20,
    color: Colors.secondary,
  },
  itemText: {
    fontSize: 14,
    color: Colors.text,
    marginTop: 4,
  },
});

export default GridItem;
