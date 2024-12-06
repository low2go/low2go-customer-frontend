import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductContext, ProductProvider } from './ProductContext';

// Define the cart item type (storing only productId and quantity)
export type CartItemObj = {
  productId: string;
  quantity: number;
};

export interface CartContextType {
  cartItems: CartItemObj[];
  cartTotal: number;
  loading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

// Provide a default value for the context to ensure it's never undefined
const defaultContextValue: CartContextType = {
  cartItems: [],
  cartTotal: 0,
  loading: false,
  error: null,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
};

type CartProviderProps = {
  children: ReactNode;
};


const calculateCartTotal = (cartItems: CartItemObj[], products: Product[]) => {
    return cartItems.reduce((total, cartItem) => {
      const product = products.find(product => product.productId === cartItem.productId);
      
      return product ? total + product.price * cartItem.quantity : total;
    }, 0); 
  };

export const CartContext = createContext<CartContextType>(defaultContextValue);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItemObj[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cartTotal, setCartTotal] = useState<number>(0); // State for the total price

  const { products } = useContext(ProductContext); // Make sure you have 'products' in your ProductContext
  // Load cart data from AsyncStorage
  const loadCartFromStorage = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cartItems');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (err) {
      setError('Failed to load cart');
    }
  };

  // Save cart data to AsyncStorage
  const saveCartToStorage = async (cartItems: CartItemObj[]) => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (err) {
      setError('Failed to save cart');
    }
  };

  // Add an item to the cart
  const addToCart = (productId: string, quantityToAdd: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const existingItem = cartItems.find(item => item.productId === productId);
      if (existingItem) {
        // If item exists, increase the quantity by quantityToAdd
        const updatedCart = cartItems.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
        setCartItems(updatedCart);
        saveCartToStorage(updatedCart);
      } else {
        // If it's a new item, add it with the specified quantity
        const updatedCart = [...cartItems, { productId, quantity: quantityToAdd }];
        setCartItems(updatedCart);
        saveCartToStorage(updatedCart);
      }
    } catch (err) {
      setError('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  // Remove an item from the cart
  const removeFromCart = (productId: string, quantityToRemove: number) => {
    setLoading(true);
    setError(null);
    try {
      const updatedCart = cartItems.map(item => {
        if (item.productId === productId) {
          const newQuantity = item.quantity - quantityToRemove;
          if (newQuantity > 0) {
            // If quantity is greater than 0, just update the quantity
            return { ...item, quantity: newQuantity };
          } else {
            // If the new quantity is 0 or less, remove the item
            return null; // We'll filter it out in the next step
          }
        }
        return item;
      }).filter(item => item !== null); // Filter out null values (removed items)

      setCartItems(updatedCart);
      saveCartToStorage(updatedCart);
    } catch (err) {
      setError('Failed to remove item from cart');
    } finally {
      setLoading(false);
    }
  };

  // Clear all items from the cart
  const clearCart = () => {
    setCartItems([]);
    saveCartToStorage([]); // Clear the cart in AsyncStorage as well
    calculateCartTotal([], []); // Reset the total
  };

  useEffect(() => {
    loadCartFromStorage(); // Load cart data when the component mounts
  }, []);

  useEffect(() => {
    const total = calculateCartTotal(cartItems, products);
    setCartTotal(total);
  }, [cartItems, products]);

  return (
    <CartContext.Provider value={{ cartItems, cartTotal, loading, error, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
