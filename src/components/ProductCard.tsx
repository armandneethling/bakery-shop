import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import ProductModal from "./ProductModal";
import { notify } from "./ToastNotification";
import { HiOutlineShoppingCart } from "react-icons/hi";

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(value);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity,
      });
      notify(`${quantity} ${product.name} added to cart!`);
      setQuantity(1);
    }
  };

  return (
    <>
      <motion.div
        className="product-card p-4 cursor-pointer bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="image-container">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-bakery-brown mb-1">
            {product.name}
          </h3>
          <p className="text-xl font-bold text-bakery-brown mb-2">
            {formatCurrency(product.price)}
          </p>
          <div className="flex items-center mt-2">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              onClick={(e) => e.stopPropagation()}
              className="border border-gray-300 rounded px-2 py-1 text-center w-16 mr-2"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              className="btn btn-primary flex items-center"
            >
              <HiOutlineShoppingCart className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
      {isModalOpen && (
        <ProductModal product={product} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default ProductCard;