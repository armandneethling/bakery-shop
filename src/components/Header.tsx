import { Link } from 'react-router-dom';
import logo from '../assets/images/header-logo.png';

const Header = () => (
    <header className="header-container">
        <Link to="/">
            <img src={logo} alt="Bakery Logo" className="header-logo" />
        </Link>
        <nav className="header-nav">
            <Link to="/" className="header-link">Home</Link>
            <Link to="/products" className="header-link">Products</Link>
            <Link to="/cart" className="header-link">Checkout</Link>
        </nav>
    </header>
);

export default Header;
