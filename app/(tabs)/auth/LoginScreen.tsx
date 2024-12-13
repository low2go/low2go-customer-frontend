import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '@/app/context/AuthContext';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const { login, logout, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      console.log('Logged in successfully!');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text>Welcome, {user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Login" onPress={handleLogin} color="#4CAF50" />
          <Text style={styles.footerText}>
            Don’t have an account?{' '}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('Sign Up')}
            >
              Sign Up
            </Text>
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#CCCCCC',
  },
  footerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666666',
  },
  link: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
