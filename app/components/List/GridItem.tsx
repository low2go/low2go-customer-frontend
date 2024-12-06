import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Colors } from '@/app/constants/colors';

type GridItemProps = {
  productId: string;
  name: string; 
  stock: number;
  price: number;
  imageUrl: string;
  navigation: NavigationProp<any>;
};

const GridItem = ({ name, productId, stock, price, imageUrl, navigation }: GridItemProps) => {
  const handlePress = () =>
    navigation.navigate('Item Detail', {
      product: { name, productId, stock, price, imageUrl, navigation },
  });

  return (
    <TouchableOpacity style={styles.gridItem} onPress={handlePress} activeOpacity={0.8}>
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
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 10, // Increased margin for better spacing between items
    backgroundColor: 'cream',
    height: 220, // Slightly increased height for better proportions
    borderRadius: 10, // Smooth corners
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start', // Ensure content aligns at the top
    borderWidth: 1, // Border to visually separate items
    borderColor: '#ddd', // Light gray border
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  image: {
    width: '100%',
    height: 140, // Increased height for image prominence
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-between', // Spread out the text evenly
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  itemText: {
    fontSize: 16,
    color: Colors.text,
    marginVertical: 4,
    fontWeight: '500',
  },
  stockText: {
    fontSize: 14,
    color: Colors.primary,
  },
});


export default GridItem;