import CartList from '../components/CartList';
import { CartProvider } from '../context/CartContext';

const Cart = () => {
    return (
        <CartProvider>
            <div className="cart-page-container">
                <div className="cart-list-container">
                    <h2 className="cart-header">Your Cart</h2>
                    <CartList />
                </div>
            </div>
        </CartProvider>
    );
};

export default Cart;
