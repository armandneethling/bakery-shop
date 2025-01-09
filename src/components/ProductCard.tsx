import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        onAddToCart(product, quantity);
    };

    return (
        <div className="product-card bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 duration-300">
            <div className="image-container">
                <img src={product.imageUrl} alt={product.name} className="product-image w-full h-full object-cover" />
            </div>
            <div className="p-4">
                <h3 className="product-name text-xl font-semibold">{product.name}</h3>
                <p className="product-price text-gray-700">R{product.price}</p>
                <div className="quantity-container">
                    <label htmlFor={`quantity-${product.id}`} className="text-gray-700">Quantity:</label>
                    <input 
                        type="number"
                        id={`quantity-${product.id}`}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                        min="1"
                        className="quantity-input border rounded p-1 w-16"
                    />
                </div>
                <button className="btn btn-primary mt-4" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;
