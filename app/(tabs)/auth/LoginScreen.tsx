import React, { useState } from 'react';
import { View, TextInput, Text, ActivityIndicator, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
import { useAuth } from '@/app/context/AuthContext';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const { login, logout, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      console.log('Logged in successfully!');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
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
    <ImageBackground
      source={require('@/assets/loginBackground.png')} // Update with your background image path
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {user ? (
          <>
            <Text style={styles.welcomeText}>Welcome, {user.email}</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.blurWrapper}>
              <BlurView style={styles.blurSquare} intensity={35} />
            </View>

            <Text style={styles.headerText}>Log In</Text>

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

            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            )}

            <View style={styles.registerLinkContainer}>
              <Text style={styles.footerText}>Don’t have an account? </Text>
              <TouchableOpacity onPress={() => navigation.replace('Sign Up')}>
                <Text style={styles.linkText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        )}
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
  registerLinkContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default LoginScreen;
