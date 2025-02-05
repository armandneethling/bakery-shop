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
import { CartItem } from '../context/CartContext';

const products: CartItem[] = [
  {
    id: 1,
    name: "Buttermilk Rusks with Nuts & Seeds",
    price: 70.0,
    imageUrl: "/images/nuts-seeds-buttermilk.png",
    quantity: 1,
    description: "Contains nuts and seeds",
    ingredients: "Wheat flour, butter, vegetable oil, buttermilk, sugar, eggs, nuts, seeds, all-bran, raisins",
    allergens: "gluten, dairy, eggs, nuts",
  },
  {
    id: 2,
    name: "Buttermilk Rusks with Macadamias",
    price: 70.0,
    imageUrl: "/images/macadamias-buttermilk.png",
    quantity: 1,
    description: "Contains macadamias",
    ingredients: "Wheat flour, butter, vegetable oil, buttermilk, sugar, eggs, macadamia nuts",
    allergens: "gluten, dairy, eggs, nuts",
  },
  {
    id: 3,
    name: "Buttermilk Rusks Plain",
    price: 60.0,
    imageUrl: "/images/plain-buttermilk.png",
    quantity: 1,
    description: "Plain buttermilk rusks",
    ingredients: "Wheat flour, butter, vegetable oil, buttermilk, sugar, eggs",
    allergens: "gluten, dairy, eggs, nuts",
  },
  {
    id: 4,
    name: "Buttermilk Rusks with Cranberries",
    price: 70.0,
    imageUrl: "/images/cranberries-buttermilk.png",
    quantity: 1,
    description: "Contains cranberries",
    ingredients: "Wheat flour, butter, vegetable oil, buttermilk, sugar, eggs, cranberries",
    allergens: "gluten, dairy, eggs, nuts",
  },
];

interface ProductListProps {
  onAddToCart: (item: Product) => void;
  onAddToCart: (item: CartItem) => void;
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
