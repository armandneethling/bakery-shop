import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="footer-links">
      <Link to="/contact" className="footer-link">Contact Me</Link>
    </div>
    <div className="footer-contact">
      <p className="text-sm font-semibold">HomeBaked Rusks</p>
      <p className="text-sm">Phone: +27 83 409 5454</p>
      <p className="text-sm">Email: homebakedrusks@gmail.com</p>
    </div>
    <div className="text-sm text-gray-600">
      &copy; {new Date().getFullYear()} Bakery. All rights reserved.
    </div>
  </footer>
);

export default Footer;
