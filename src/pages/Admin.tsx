// src/pages/Admin.tsx
import React, { useState } from 'react';  // Added useState here
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { ref, push, set } from 'firebase/database';
import { auth, database } from '../firebaseConfig';  // Combined imports

const Admin: React.FC = () => {
  const navigate = useNavigate();

  // State for the product form
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    imageUrl: '',
    description: '',
    ingredients: '',
    allergens: '',
  });

  // Handle input changes in the form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  // Handle form submission to add a new product
  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const productsRef = ref(database, 'products');
      const newProductRef = push(productsRef);
      await set(newProductRef, product);
      alert('Product added successfully!');
      setProduct({
        name: '',
        price: 0,
        imageUrl: '',
        description: '',
        ingredients: '',
        allergens: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Render the admin dashboard
  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>Add New Product</h2>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          name="price"
          value={product.price || ''}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        ></textarea>
        <textarea
          name="ingredients"
          value={product.ingredients}
          onChange={handleInputChange}
          placeholder="Ingredients"
          required
        ></textarea>
        <textarea
          name="allergens"
          value={product.allergens}
          onChange={handleInputChange}
          placeholder="Allergens"
          required
        ></textarea>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Admin;