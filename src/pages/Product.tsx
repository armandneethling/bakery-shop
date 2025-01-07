import React from 'react';

interface ProductProps {
    name: string;
    image: string;
    description: string;
    price: number;
    onAddToCart: () => void;
}

const Product: React.FC<ProductProps> = ({ name, image, description, price, onAddToCart }) => {
    return (
        <div className="product-card">
            <img src={image} alt={name} className="product-image" />
            <h3 className="product-name">{name}</h3>
            <p className="product-description">{description}</p>
            <p className="product-price">R{price}</p>
            <button className="button-primary" onClick={onAddToCart}>Add to Cart</button>
        </div>
    );
};

export default Product;
