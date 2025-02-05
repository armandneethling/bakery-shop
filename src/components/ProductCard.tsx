// src/components/ProductCard.tsx
import React from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  ingredients: string;
  allergens: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: R{product.price}</p>
      {/* Add other product details if desired */}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
