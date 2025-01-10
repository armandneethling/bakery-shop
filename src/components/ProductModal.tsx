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

    const modalBackgroundStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 50,
        padding: '40px', // Add padding to prevent overlap with header and footer
    };

    return (
        <motion.div 
            style={modalBackgroundStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div 
                className="modal-content" // Apply custom class name
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition duration-300"
                >
                    <HiOutlineX size={24} />
                </button>
                <h2 className="text-2xl font-semibold text-bakery-brown mb-4">{product.name}</h2>
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-2 shadow-md" />
                <p className="text-xl font-bold text-bakery-brown mb-2">{formatCurrency(product.price)}</p>
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
