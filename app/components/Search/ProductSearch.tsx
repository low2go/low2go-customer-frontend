import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ProductSearchProps = {
  navigation: any;
};

const ProductSearch: React.FC<ProductSearchProps> = ({ navigation }) => {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (query.trim() !== "") {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://ec2-13-58-26-172.us-east-2.compute.amazonaws.com:8080/catalog/search?query=${query}`);
        const data = await response.json();
        
        navigation.navigate("Specific Search", {
          query,
          products: data,
          loading: false, // Pass the loading state as false once data is fetched
          error: null,
        });
      } catch (err) {
        setError("Failed to fetch products");
        navigation.navigate("Specific Search", {
          query,
          products: [],
          loading: false,
          error: "Failed to fetch products",
        });
      } finally {
        setLoading(false);
      }
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
        autoComplete="off" // Disable autocomplete
        autoCorrect={false} // Disable autocorrection
        keyboardType="default" // Ensure standard keyboard behavior
        spellCheck={false} // Disable spell checking
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
    backgroundColor: "#f9f9f9",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    minWidth: 300,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});

export default ProductSearch;
