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
                className="welcome-message-container"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-5xl font-semibold text-bakery-brown mb-4">Welcome to</h1>
                <h2 className="text-3xl font-semibold text-dark-brown mb-2">Home Baked Rusks</h2>
                <p className="text-md font-bold text-red-purple mb-2">by Linda</p>
                <p className="text-lg text-gray-700 mb-6">Indulge in our delightful treats and discover your new favorites.</p>
                <div className="note">Collection only!</div>
                <div className="w-full flex justify-center mt-4">
                    <button 
                        onClick={handleExplore}
                        className="explore-button"
                    >
                        Explore Our Products
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default WelcomeMessage;
