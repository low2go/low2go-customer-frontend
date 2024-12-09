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
    flexDirection: 'row', // Lay items horizontally

    backgroundColor: '#f9f9f9', // Neutral background for better contrast

    overflow: 'hidden', // Clip content inside the border radius
    alignItems: 'center', // Center items vertically
    borderWidth: 1, 
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
  },
  image: {
    width: 100, // Fixed width for consistent layout
    height: 100, // Fixed height to maintain aspect ratio
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10, // Smooth corners for the left side of the image
  },
  textContainer: {
    flex: 1, // Take up the remaining space
    padding: 10, // Spacing inside the text container
    justifyContent: 'space-between', // Spread the text evenly
  },
  priceText: {
    fontSize: 16,
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
});



export default GridItem;