import React from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    name: "Buttermilk Rusks with Nuts&Seeds",
    price: 20.0,
    imageUrl: "/src/assets/images/nuts-seeds-buttermilk.png",
  },
  {
    id: 2,
    name: "Buttermilk Rusks with Macadamias",
    price: 15.0,
    imageUrl: "/src/assets/images/macadamias-buttermilk.png",
  },
  {
    id: 3,
    name: "Buttermilk Rusks Plain",
    price: 25.0,
    imageUrl: "/src/assets/images/plain-buttermilk.png",
  },
  {
    id: 4,
    name: "Buttermilk Rusks with Cranberries",
    price: 18.0,
    imageUrl: "/src/assets/images/cranberries-buttermilk.png",
  },
];

interface ProductListProps {
    onAddToCart: (product: { id: number; name: string; price: number; imageUrl: string }, quantity: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {products.map((product) => (
      <ProductCard 
        key={product.id} 
        product={product} 
        onAddToCart={(product, quantity) => {
          onAddToCart(product, quantity);
        }} 
      />
    ))}
  </div>
);

export default ProductList;
