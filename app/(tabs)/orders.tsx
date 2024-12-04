import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/colors';

export default function Orders() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Orders</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.text,
    fontSize: 24,
  },
});
