import { useCart, CartItem } from '../context/CartContext';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { motion } from 'framer-motion';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import ToastNotification from '../components/ToastNotification';

const Product = () => {
    const { addToCart } = useCart();

    const handleAddToCart = (product: CartItem) => {
        addToCart(product);
    };

    return (
        <div className="relative h-auto overflow-auto p-4 product-page-container">
            <ToastNotification />
            <div
                className="absolute top-0 left-0 h-full w-full bg-cover bg-center bg-no-repeat filter blur-md"
                style={{ backgroundImage: `url('/src/assets/images/bakery-bg.jpg')` }}
            >
                <div className="absolute top-0 left-0 h-full w-full bg-black opacity-40"></div>
            </div>
            <div className="relative z-10 flex flex-col space-y-4 product-pag">
                <motion.div
                    className="product-container mx-auto p-6 bg-white/80 rounded-lg shadow-lg hover:shadow-xl w-full max-w-7xl transition-shadow duration-300 overflow-hidden"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl font-semibold text-bakery-brown mb-8">Our Products</h2>
                    <SimpleBar style={{ maxHeight: 'calc(100% - 60px)' }}>
                        <div className="p-4">
                            <ProductList onAddToCart={handleAddToCart} />
                        </div>
                    </SimpleBar>
                </motion.div>

                <motion.div
                    className="order-cake-section"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <h3 className="text-2xl font-semibold text-bakery-brown mb-4">Order a Cake</h3>
                    <p className="mb-4">
                        Fill out a form if you would like to order a custom cake. We will get back to you shortly!
                    </p>
                    <Link to="/order-cake">
                        <motion.button
                            className="btn btn-primary flex items-center"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, yoyo: Infinity }}
                        >
                            <HiOutlineShoppingCart className="mr-2" /> Order Now
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Product;

