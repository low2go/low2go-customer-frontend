import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install this: expo install @expo/vector-icons

type ProductSearchProps = {
  navigation: any;
};

const ProductSearch: React.FC<ProductSearchProps> = ({ navigation }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      // Navigate to the Specific Search screen with the search query as a parameter
      navigation.navigate("Specific Search", { searchQuery: query.trim() });
    }
  };

  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search for a product..."
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch} // Trigger search on "Enter"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9", // Light background for modern look
    borderRadius: 25, // Rounded edges
    paddingHorizontal: 15, // Padding inside the container
    height: 40,
    minWidth: 300,
  },
  icon: {
    marginRight: 10, // Space between icon and input
  },
  input: {
    flex: 1, // Input takes the remaining space
    fontSize: 16,
    color: "#333",
  },
});

export default ProductSearch;
