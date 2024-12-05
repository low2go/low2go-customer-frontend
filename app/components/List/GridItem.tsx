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
    navigation.navigate('ItemDetail', {
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
    margin: 5,
    backgroundColor: Colors.background,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3, // Shadow for Android
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover', // Adjust image sizing to fill container
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
    alignItems: 'flex-start',
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