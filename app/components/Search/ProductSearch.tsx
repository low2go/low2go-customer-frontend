import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

type ProductSearchProps = {
  navigation: any;
};

const ProductSearch: React.FC<ProductSearchProps> = ({ navigation }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      // Navigate to the SearchResults screen with the search query as a parameter
      navigation.navigate("Specific Search", { searchQuery: query.trim() });
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Search for a product..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch} // Trigger search on "Enter"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 8,
    width: 250,
  },
});

export default ProductSearch;
