import { motion } from 'framer-motion';
import { HiOutlineX } from 'react-icons/hi';

interface ProductModalProps {
    product: {
        id: number;
        name: string;
        price: number;
        imageUrl: string;
        description: string;
        ingredients: string;
        allergens: string;
    };
    onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR'
        }).format(value);
    };

    return (
        <motion.div 
            className="product-modal-container fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div 
                className="relative bg-white p-3 rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 max-h-[calc(100vh-40px)] overflow-y-auto" 
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition duration-300"
                >
                    <HiOutlineX size={24} />
                </button>
                <h2 className="text-xl font-semibold text-bakery-brown mb-4">{product.name}</h2>
                <img src={product.imageUrl} alt={product.name} className="w-3/4 h-auto object-contain rounded-lg shadow-md mx-auto" />
                <p className="text-lg font-bold text-bakery-brown mb-2">{formatCurrency(product.price)}</p>
                <div className="text-sm font-semibold text-gray-700 mb-2">
                    <p className="text-md font-bold mb-1">Ingredients:</p>
                    <p className="text-sm text-bakery-brown">{product.ingredients}</p>
                </div>
                <div className="text-sm font-semibold text-gray-700 mb-2">
                    <p className="text-md font-bold mb-1">Allergens:</p>
                    <p className="text-sm text-bakery-brown">{product.allergens}</p>
                </div>
                <button 
                    onClick={onClose}
                    className="w-full bg-bakery-yellow text-bakery-brown py-2 px-4 rounded-lg hover:bg-yellow-300 transition-colors duration-300"
                >
                    Close
                </button>
            </motion.div>
        </motion.div>
    );
};

export default ProductModal;
