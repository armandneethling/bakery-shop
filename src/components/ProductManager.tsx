import { useState, useEffect } from 'react';
import axios from 'axios';
import { ref, push, set, onValue, remove } from 'firebase/database';
import { database } from '../firebaseConfig';
import { toast } from 'react-toastify';

export interface Product {
  id?: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  ingredients: string;
  allergens: string;
}

export const useProductManager = () => {
  // State variables
  const [product, setProduct] = useState<Product>({
    name: '',
    price: 0,
    imageUrl: '',
    description: '',
    ingredients: '',
    allergens: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentProductId, setCurrentProductId] = useState<string>('');

  // Fetch products from the database
  useEffect(() => {
    const productsRef = ref(database, 'products');

    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsArray: Product[] = Object.keys(data).map((key) => ({
          id: key,
          ...(data[key] as Product),
        }));
        setProducts(productsArray);
      } else {
        setProducts([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_upload');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/bakeryshop/image/upload',
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  // Handle form submission to add or update a product
  const handleAddOrUpdateProduct = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Basic validation
    if (
      !product.name ||
      !product.price ||
      !product.description ||
      (!product.imageUrl && !imageFile) ||
      !product.ingredients ||
      !product.allergens
    ) {
      toast.error('Please fill out all required fields.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    try {
      let imageUrl = product.imageUrl;

      // Upload image if a new file is selected
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const productData = {
        ...product,
        imageUrl,
      };

      if (editMode && currentProductId) {
        // Update existing product
        const productRef = ref(database, `products/${currentProductId}`);
        await set(productRef, productData);
        toast.success('Product updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        // Add new product
        const productsRef = ref(database, 'products');
        const newProductRef = push(productsRef);
        await set(newProductRef, productData);
        toast.success('Product added successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }

      // Reset form and state
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  // Handle selecting a product to edit
  const selectProductToEdit = (productToEdit: Product) => {
    setProduct({
      name: productToEdit.name,
      price: productToEdit.price,
      imageUrl: productToEdit.imageUrl,
      description: productToEdit.description,
      ingredients: productToEdit.ingredients,
      allergens: productToEdit.allergens,
    });
    setImageFile(null);
    setEditMode(true);
    setCurrentProductId(productToEdit.id || '');
  };

  // Handle deleting a product
  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const productRef = ref(database, `products/${id}`);
        await remove(productRef);
        toast.success('Product deleted successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };

  // Reset the form and state
  const resetForm = () => {
    setProduct({
      name: '',
      price: 0,
      imageUrl: '',
      description: '',
      ingredients: '',
      allergens: '',
    });
    setImageFile(null);
    setEditMode(false);
    setCurrentProductId('');
  };

  return {
    product,
    products,
    editMode,
    handleInputChange,
    handleImageChange,
    handleAddOrUpdateProduct,
    selectProductToEdit,
    handleDeleteProduct,
    resetForm,
  };
};
