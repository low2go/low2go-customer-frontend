import React, { createContext, useState, useEffect, ReactNode } from 'react';

export type Product = {
  productId: string;
  name: string;
  stock: number;
  price: number;
  imageUrl: string;
};

export interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => void;
}

// Provide a default value for the context to ensure it's never undefined
const defaultContextValue: ProductContextType = {
  products: [],
  loading: false,
  error: null,
  fetchProducts: () => {},
};

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductContext = createContext<ProductContextType>(defaultContextValue);

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://ec2-13-58-26-172.us-east-2.compute.amazonaws.com:8080/catalog/all'); 

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();  // Fetch products when the provider is first rendered
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
