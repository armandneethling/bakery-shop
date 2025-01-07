import React from 'react';

interface ProductModalProps {

    product: {
        id: number;
        name: string;
        imageUrl: string;
        description: string;
        price: number;
    };

    isOpen: boolean;
    onClose: () => void;
    onAddToCart: () => void;

}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="modal-close" onClick={onClose}>X</button>
                <img src={product.image} alt={product.name} className="modal-image" />
                <h3 className="modal-name">{product.name}</h3>
                <p className="modal-description">{product.description}</p>
                <p className="modal-price">R{product.price}</p>
                <button className="button-primary" onClick={onAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductModal;