import React from "react";
import { TextInput, View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import CartIcon from "./CartIcon";
import ProductSearch from "./Search/ProductSearch";
import { Ionicons } from '@expo/vector-icons'; // Or replace with any other icon library you are using

type HeaderProps = {
  navigation: any;
  showBackButton?: boolean; // Optional prop to control the back button
};

const Header: React.FC<HeaderProps> = ({ navigation, showBackButton = false }) => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" /> 
        </TouchableOpacity>
      )}

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
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 15,
    justifyContent: "space-between",
  },
  backButton: {
    marginRight: 5, // Adjust spacing as needed
  },
  cartIconContainer: {
    marginHorizontal: 7, // Space between the search bar and the cart icon
  },
});

export default Header;
