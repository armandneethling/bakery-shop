import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Product from './pages/Product';
import CakeOrdering from './pages/CakeOrdering';
import { CartProvider } from './context/CartContext';
import ToastNotification from './components/ToastNotification';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';

const App = () => {
    return (
        <CartProvider>
            <Router>
                <Header />
                <ToastNotification />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order-cake" element={<CakeOrdering />} />
                    <Route path="/contact" element={<ContactUs />} />
                </Routes>
                <Footer />
            </Router>
        </CartProvider>
    );
};

export default App;
