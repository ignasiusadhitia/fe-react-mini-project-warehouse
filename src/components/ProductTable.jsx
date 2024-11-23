import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  deleteProduct,
  fetchProducts,
  selectProduct,
} from '../redux/slices/productSlice';
import { formatCurrency } from '../utils/utils.js';

const ProductTable = () => {
  const { products, loading, error, isSuccess } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (product) => {
    dispatch(selectProduct(product));
    navigate(`/products/edit/${product.id}`);
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchProducts());
    }
  }, [isSuccess]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!products?.length) {
    return <div>No products found</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product, index) => (
          <tr key={product.id}>
            <td>{index + 1}</td>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{formatCurrency(product.price)}</td>
            <td>{product.stock}</td>
            <td>
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
