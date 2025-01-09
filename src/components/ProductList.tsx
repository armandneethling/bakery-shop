import ProductCard from './ProductCard';
import { CartItem } from '../context/CartContext';

const products: CartItem[] = [
  {
    id: 1,
    name: "Buttermilk Rusks with Nuts&Seeds",
    price: 20.0,
    imageUrl: "/src/assets/images/nuts-seeds-buttermilk.png",
    quantity: 1,
  },
  {
    id: 2,
    name: "Buttermilk Rusks with Macadamias",
    price: 15.0,
    imageUrl: "/src/assets/images/macadamias-buttermilk.png",
    quantity: 1,
  },
  {
    id: 3,
    name: "Buttermilk Rusks Plain",
    price: 25.0,
    imageUrl: "/src/assets/images/plain-buttermilk.png",
    quantity: 1,
  },
  {
    id: 4,
    name: "Buttermilk Rusks with Cranberries",
    price: 18.0,
    imageUrl: "/src/assets/images/cranberries-buttermilk.png",
    quantity: 1,
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
