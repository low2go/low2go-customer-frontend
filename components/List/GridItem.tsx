import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

type GridItemProps = {
  name: string; 
};

const GridItem = ({ name }: GridItemProps) => {
  return (
    <View style={styles.gridItem}>
      <Text style={styles.itemText}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f0f0f0',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    color: Colors.text,
  },
});

export default GridItem;
