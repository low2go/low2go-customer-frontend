import React, { useState } from 'react';
import { View, TextInput, Text, ActivityIndicator, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ImageBackground, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useAuth } from '@/app/context/AuthContext'; // Use your AuthContext
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/Firebase';

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully!');
      navigation.replace('Login'); // Navigate back to Login screen
    } catch (error) {
      console.error('Error creating account:', error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/loginBackground.png')} // Use the same background image as in Login screen
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.blurWrapper}>
            <BlurView style={styles.blurSquare} intensity={35} />
          </View>

          <Text style={styles.headerText}>Sign Up</Text>

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

          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          )}

          <View style={styles.loginLinkContainer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Text style={styles.linkText}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    width: 350,
    height: 400,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 30,
    marginTop: 'auto',
    marginBottom: 'auto',
    position: 'relative',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: 'white',
  },
  blurWrapper: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
    overflow: 'hidden',
  },
  blurSquare: {
    flex: 1,
  },
  input: {
    marginVertical: 8,
    marginHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: 'transparent',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
    paddingHorizontal: 40,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
  },
  loginLinkContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
