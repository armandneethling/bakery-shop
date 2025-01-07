import React from 'react';

interface Product {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}

interface ProductListProps {
    products: Product[];
    onAddToCart: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <Product
                    key={product.id}
                    name={product.name}
                    image={product.image}
                    description={product.description}
                    price={product.price}
                    onAddToCart={() => onAddToCart(product.id)}
                />
            ))}
        </div>
    );
};

export default ProductList;
