import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig'; // Adjust the path if necessary
import { signOut } from 'firebase/auth';

const Header: React.FC = () => {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="header-container">
      <Link to="/">
        <img src="/images/header-logo.png" alt="Bakery Logo" className="header-logo" />
      </Link>
      <nav className="header-nav">
        <Link to="/" className="header-link">Home</Link>
        <Link to="/products" className="header-link">Products</Link>
        <Link to="/cart" className="header-link">Checkout</Link>

        {user ? (
          <>
            <Link to="/admin" className="header-link">Admin</Link>
            <button onClick={handleLogout} className="header-link">Logout</button>
          </>
        ) : (
          <Link to="/login" className="header-link">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
