import React, { useState } from 'react';
import { CartItem } from '../context/CartContext';
import ProductModal from './ProductModal';
import { HiOutlineSearch } from 'react-icons/hi'; 

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    ingredients: string;
    allergens: string;
}

interface ProductCardProps {
    product: Product;
    onAddToCart: (item: CartItem) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const handleAddToCart = () => {
        const item: CartItem = { ...product, quantity: 1 };
        onAddToCart(item);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="product-card bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 duration-300">
                <div className="image-container relative">
                    <img src={product.imageUrl} alt={product.name} className="product-image w-full h-full object-cover cursor-pointer" />
                    <button 
                        className="magnifying-glass-btn absolute top-2 right-2" // Apply custom class name
                        onClick={handleOpenModal}
                    >
                        <HiOutlineSearch size={24} />
                    </button>
                </div>
                <div className="p-4">
                    <h3 className="product-name text-xl font-semibold">{product.name}</h3>
                    <p className="product-price text-gray-700">R{product.price}</p>
                    <button className="btn btn-primary mt-4" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>

            {isModalOpen && (
                <ProductModal 
                    product={product}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default ProductCard;
