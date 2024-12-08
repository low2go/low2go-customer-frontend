import React from 'react';
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Import useRoute from React Navigation

const SpecificSearch = () => {
  const route = useRoute(); // Use the useRoute hook to get the route

  // Access the searchQuery from route.params
  const { searchQuery } = route.params as { searchQuery: string };

  return (
    <View>
      <Text>Search Results for: {searchQuery}</Text>
      {/* Render actual search results based on searchQuery */}
    </View>
  );
};

export default SpecificSearch;
