import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import GridItem from '@/components/List/GridItem';
import { Colors } from '@/constants/colors';

type Item = {
  id: string;
  name: string;
};

const items: Item[] = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Item ${i + 1}`,
}));

const ShopScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shop</Text>
      <FlashList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GridItem name={item.name} />}
        numColumns={2}
        estimatedItemSize={100}
        columnWrapperStyle={styles.row}
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
});

export default ShopScreen;
