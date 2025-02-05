// src/components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebaseConfig';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  ingredients: string;
  allergens: string;
}

interface ProductListProps {
  onAddToCart: (item: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const productsRef = ref(database, 'products');

    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsArray: Product[] = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProducts(productsArray);
      } else {
        setProducts([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
