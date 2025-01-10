import ProductCard from './ProductCard';
import { CartItem } from '../context/CartContext';

import nutsSeedsButtermilk from './assets/images/nuts-seeds-buttermilk.png';
import macadamiasButtermilk from './assets/images/macadamias-buttermilk.png';
import plainButtermilk from './assets/images/plain-buttermilk.png';
import cranberriesButtermilk from './assets/images/cranberries-buttermilk.png';

const products: CartItem[] = [
  {
    id: 1,
    name: "Buttermilk Rusks with Nuts & Seeds",
    price: 20.0,
    imageUrl: nutsSeedsButtermilk,
    quantity: 1,
    description: "Contains nuts and seeds",
    ingredients: "Flour, sugar, eggs, nuts, seeds, butter",
    allergens: "Nuts",
  },
  {
    id: 2,
    name: "Buttermilk Rusks with Macadamias",
    price: 15.0,
    imageUrl: macadamiasButtermilk,
    quantity: 1,
    description: "Contains macadamias",
    ingredients: "Flour, sugar, eggs, macadamias, butter",
    allergens: "Nuts",
  },
  {
    id: 3,
    name: "Buttermilk Rusks Plain",
    price: 25.0,
    imageUrl: plainButtermilk,
    quantity: 1,
    description: "Plain buttermilk rusks",
    ingredients: "Flour, sugar, eggs, butter",
    allergens: "Dairy",
  },
  {
    id: 4,
    name: "Buttermilk Rusks with Cranberries",
    price: 18.0,
    imageUrl: cranberriesButtermilk,
    quantity: 1,
    description: "Contains cranberries",
    ingredients: "Flour, sugar, eggs, cranberries, butter",
    allergens: "None",
  },
];

interface ProductListProps {
  onAddToCart: (item: CartItem) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {products.map((product) => (
      <ProductCard 
        key={product.id} 
        product={product} 
        onAddToCart={(item) => onAddToCart(item)}
      />
    ))}
  </div>
);

export default ProductList;
