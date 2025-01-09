import { CartItem } from '../context/CartContext';

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

interface ProductCardProps {
    product: Product;
    onAddToCart: (item: CartItem) => void; // Ensure CartItem is used
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const handleAddToCart = () => {
        const item: CartItem = { ...product, quantity: 1 };
        onAddToCart(item);
    };

    return (
        <div className="product-card bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 duration-300">
            <div className="image-container">
                <img src={product.imageUrl} alt={product.name} className="product-image w-full h-full object-cover" />
            </div>
            <div className="p-4">
                <h3 className="product-name text-xl font-semibold">{product.name}</h3>
                <p className="product-price text-gray-700">R{product.price}</p>
                <button className="btn btn-primary mt-4" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;
