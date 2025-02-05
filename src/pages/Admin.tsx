import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useProductManager } from '../components/ProductManager';

const Admin: React.FC = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Use the custom hook for product management
  const {
    product,
    products,
    editMode,
    handleInputChange,
    handleImageChange,
    handleAddOrUpdateProduct,
    selectProductToEdit,
    handleDeleteProduct,
    resetForm, // Destructure resetForm
  } = useProductManager();

  // Render the admin dashboard
  return (
    <div className="admin-container flex flex-col min-h-screen bg-bakery-cream">
      <ToastContainer />

      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-bakery-brown text-white">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-bakery-yellow text-bakery-brown px-4 py-2 rounded hover:bg-bakery-light-pink transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6">
        {/* Product Form */}
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editMode ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleAddOrUpdateProduct} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                placeholder="Product Name"
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bakery-pink"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Price (R)
              </label>
              <input
                type="number"
                name="price"
                value={product.price || ''}
                onChange={handleInputChange}
                placeholder="Price"
                step="0.01"
                min="0"
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bakery-pink"
              />
            </div>

            {/* Image File Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-gray-700"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleInputChange}
                placeholder="Description"
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bakery-pink"
              ></textarea>
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Ingredients
              </label>
              <textarea
                name="ingredients"
                value={product.ingredients}
                onChange={handleInputChange}
                placeholder="Ingredients"
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bakery-pink"
              ></textarea>
            </div>

            {/* Allergens */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Allergens
              </label>
              <textarea
                name="allergens"
                value={product.allergens}
                onChange={handleInputChange}
                placeholder="Allergens"
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bakery-pink"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-4 mt-4">
              <button
                type="submit"
                className="bg-bakery-brown text-white font-semibold px-4 py-2 rounded hover:bg-darker-brown transition duration-300"
              >
                {editMode ? 'Update Product' : 'Add Product'}
              </button>
              {editMode && (
                <button
                  type="button"
                  onClick={resetForm} // Use resetForm directly
                  className="bg-gray-500 text-white font-semibold px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Product List */}
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-semibold mb-4">Product List</h2>
          <table className="min-w-full border">
            <thead>
              <tr className="bg-bakery-pink text-left">
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Price (R)</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-bakery-light-pink">
                  <td className="py-2 px-4 border-b">
                    {prod.imageUrl && (
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">{prod.name}</td>
                  <td className="py-2 px-4 border-b">
                    {prod.price.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => selectProductToEdit(prod)}
                      className="bg-blue-500 text-white font-semibold px-3 py-1 rounded hover:bg-blue-700 transition duration-300 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod.id!)}
                      className="bg-red-500 text-white font-semibold px-3 py-1 rounded hover:bg-red-700 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
