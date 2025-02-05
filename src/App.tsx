import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Product from './pages/Product';
import CakeOrdering from './pages/CakeOrdering';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { CartProvider } from './context/CartContext';
import ToastNotification from './components/ToastNotification';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
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
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/admin"
                      element={
                        <PrivateRoute>
                          <Admin />
                        </PrivateRoute>
                      }
                    />
                </Routes>
                <Footer />
            </Router>
        </CartProvider>
    );
};

export default App;
