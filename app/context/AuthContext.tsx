import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, signInWithEmailAndPassword, onAuthStateChanged, signOut, getIdToken } from 'firebase/auth';
import { auth } from '../Firebase';
import * as SecureStore from 'expo-secure-store'; // Secure storage library

interface AuthContextProps {
  user: User | null;
  loading: boolean; // Handle loading state
  token: String;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  // Automatically log in the user if the token exists
  useEffect(() => {
    const autoLogin = async () => {
      try {
        const email = await SecureStore.getItemAsync('email');
        const password = await SecureStore.getItemAsync('password');

        if (email && password) {
          // Attempt login using stored credentials
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          setUser(userCredential.user);
          const token = await getIdToken(userCredential.user);
          setToken(token);
          console.log("token: " + token);
          console.log("uid: " + userCredential.user.uid);
        } else {
          console.log('No stored credentials found');
        }
      } catch (error) {
        console.error('Auto-login failed:', error);
      } finally {
        setLoading(false); // Stop loading after checking token
      }
    };

    autoLogin();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Save credentials securely
      await SecureStore.setItemAsync('email', email);
      await SecureStore.setItemAsync('password', password);

      // Optionally store the Firebase token for future use
      const token = await getIdToken(userCredential.user);
      setToken(token);
      console.log('Firebase token:', token);

      setUser(userCredential.user);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);

      // Clear stored credentials
      await SecureStore.deleteItemAsync('email');
      await SecureStore.deleteItemAsync('password');

      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
