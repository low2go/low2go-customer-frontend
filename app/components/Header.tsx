import React, { useState } from "react";
import { TextInput, View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import CartIcon from "./CartIcon";
import ProductSearch from "./Search/ProductSearch";


type HeaderProps = {
  navigation: any;
};

const Header: React.FC<HeaderProps> = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.headerContainer}>
    {/* ProductSearch Component */}
    <ProductSearch navigation={navigation} />

    {/* Cart Icon */}
    <TouchableOpacity onPress={() => navigation.navigate("Cart Page")} style={styles.cartIconContainer}>
      <CartIcon />
    </TouchableOpacity>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      marginHorizontal: 15,
      justifyContent: 'space-between',
    },
    cartIconContainer: {
      marginLeft: 10, // Space between the search bar and the cart icon
    },
  });

export default Header;
