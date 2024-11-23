import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  addProduct,
  resetProduct,
  resetProductid,
  toggleBarcodeScanner,
  updateProduct,
} from '../redux/slices/productSlice';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, productId, isEditing, loading } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: isEditing ? id : productId,
    name: isEditing ? product.name : '',
    description: isEditing ? product.description : '',
    price: isEditing ? product.price : '',
    stock: isEditing ? product.stock : '',
    logs: isEditing ? product.logs : [],
  });

  const handleBarcodeScannerOpen = () => {
    dispatch(toggleBarcodeScanner());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    dispatch(resetProduct());
    dispatch(resetProductid());
    navigate('/products');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      dispatch(updateProduct(formData));
    } else {
      dispatch(addProduct(formData));
    }

    dispatch(resetProduct());
    dispatch(resetProductid());
    navigate('/products');
  };

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, id: productId }));
  }, [productId]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">Product ID:</label>
        <input
          required
          id="id"
          name="id"
          type="text"
          value={formData.id}
          onChange={handleChange}
        />
        <button type="button" onClick={handleBarcodeScannerOpen}>
          Scan
        </button>
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          required
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          required
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="stock">Stock:</label>
        <input
          id="stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="reset" onClick={handleCancel}>
          Cancel
        </button>
        <button disabled={loading} type="submit">
          {isEditing ? 'Save Changes' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
