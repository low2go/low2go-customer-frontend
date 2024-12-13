// SignUpScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { useAuth } from '@/app/context/AuthContext'; // Use your AuthContext
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/Firebase';

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login'); // Navigate back to Login screen
    } catch (error) {
      console.error('Error creating account:', error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} color="#4CAF50" />
      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </Text>
      </Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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

export default SignUpScreen;