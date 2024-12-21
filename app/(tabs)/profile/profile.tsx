import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import { Colors } from '@/app/constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/app/context/AuthContext';

export default function Profile() {
  const navigation = useNavigation();
  const { user } = useAuth(); // Access the user object from AuthContext

  const navigateToLogin = () => {
    navigation.navigate('Login'); // Ensure 'Login' is registered in your navigation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      {/* Display auth status */}
      <Text style={styles.authStatus}>
        {user ? `Logged in as: ${user.email}` : 'Not logged in'}
      </Text>
      <Button title="Go to Login" onPress={navigateToLogin} />
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
    marginBottom: 20,
  },
  authStatus: {
    color: Colors.text,
    fontSize: 16,
    marginBottom: 20,
  },
});
