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

    const formatCurrency = (value: number) => {
        return `R${value.toFixed(2)} per pack`;
    };

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

    const mainName = "Buttermilk Rusks";
    const typeName = product.name.replace(mainName, '').trim() || 'Plain';
    const extraText = "± 500g";

    return (
        <>
            <div 
                className="product-card bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 duration-300 cursor-pointer"
                onClick={handleOpenModal}
            >
                <div className="image-container relative">
                    <img src={product.imageUrl} alt={product.name} className="product-image w-full h-full object-cover" />
                    <button 
                        className="magnifying-glass-btn absolute top-2 right-2"
                        onClick={(e) => { e.stopPropagation(); handleOpenModal(); }}
                    >
                        <HiOutlineSearch size={24} />
                    </button>
                </div>
                <div className="p-4">
                    <h3 className="product-name text-xl font-semibold">
                        {mainName}
                        <br />
                        {typeName}
                    </h3>
                    <span className="text-sm text-gray-500">{extraText}</span>
                    <p className="product-price text-gray-700">{formatCurrency(product.price)}</p>
                    <button className="btn btn-primary mt-4" onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}>Add to Cart</button>
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
