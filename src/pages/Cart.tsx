import CartList from '../components/CartList';

const Cart = () => {
    return (
        <div className="cart-page-container">
            <div className="cart-list-container">
                <h2 className="cart-header">Your Cart</h2>
                <CartList />
            </div>
        </div>
    );
};

export default Cart;
