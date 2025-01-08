import { motion } from 'framer-motion';
import { HiOutlineX } from 'react-icons/hi';

interface ProductModalProps {
    product: { id: number; name: string; price: number; imageUrl: string; description: string };
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
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div 
                className="bg-white rounded-lg p-6 relative max-w-lg w-full shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-bakery-brown">{product.name}</h2>
                    <button onClick={onClose} className="text-red-500 hover:text-red-700 transition duration-300">
                        <HiOutlineX size={24} />
                    </button>
                </div>
                <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4 shadow-md" />
                <div className="mt-4">
                    <p className="text-xl font-bold text-bakery-brown">{formatCurrency(product.price)}</p>
                </div>
                <div className="mt-6">
                    <button 
                        onClick={onClose}
                        className="w-full bg-bakery-yellow text-bakery-brown py-2 px-4 rounded-lg hover:bg-yellow-300 transition-colors duration-300"
                    >
                        Close
                    </button>
                </div>
                <div className="mt-4 text-sm font-semibold text-gray-700">
                    <p className="text-md font-bold">Allergens:</p>
                    <p className="text-sm text-bakery-brown">{product.description}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProductModal;
