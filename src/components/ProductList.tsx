import React from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    name: "Buttermilk Rusks with Nuts&Seeds",
    price: 20.0,
    imageUrl: "",
  },
  {
    id: 2,
    name: "Buttermilk Rusks with Macadamias",
    price: 15.0,
    imageUrl: "",
  },
  {
    id: 3,
    name: "Buttermilk Rusks Plain",
    price: 25.0,
    imageUrl: "/src/assets/images/chocolate-cake.jpg",
  },
  {
    id: 4,
    name: "Buttermilk Rusks with Cranberries",
    price: 18.0,
    imageUrl: "",
  },
];

interface ProductListProps {
    onAddToCart: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
    ))}
  </div>
);

export default ProductList;
