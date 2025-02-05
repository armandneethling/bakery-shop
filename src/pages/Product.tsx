/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ProductList from '../components/ProductList';
import { useCart } from '../context/CartContext';

const ProductPage: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="product-page">
      <h1>Our Products</h1>
      <ProductList onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductPage;
