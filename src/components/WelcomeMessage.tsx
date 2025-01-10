import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WelcomeMessage = () => {
    const navigate = useNavigate();

    const handleExplore = () => {
        navigate('/products');
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-cover bg-center p-6">
            <motion.div 
                className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl text-center max-w-md welcome-message-container"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-5xl font-semibold text-bakery-brown mb-4">Welcome to</h1>
                <h2 className="text-3xl font-semibold text-dark-brown mb-2">Home Baked Rusks</h2>
                <p className="text-md font-bold text-red-purple mb-2">by Linda</p>
                <p className="text-lg text-gray-700 mb-6">Indulge in our delightful treats and discover your new favorites.</p>
                <button 
                    onClick={handleExplore}
                    className="bg-bakery-yellow text-bakery-brown py-2 px-6 rounded-full hover:bg-yellow-300 transition duration-300"
                >
                    Explore Our Products
                </button>
            </motion.div>
        </div>
    );
};

export default WelcomeMessage;
