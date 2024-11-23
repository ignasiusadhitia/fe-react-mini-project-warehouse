import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {
  addLog,
  fetchProduct,
  toggleBarcodeScanner,
  updateStock,
} from '../redux/slices/productSlice';

const StockForm = ({ type }) => {
  const { product, productId } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: uuidv4(),
    product_id: '',
    type: type === 'stock_in' ? 'stock_in' : 'stock_out',
    quantity: 0,
    note: '',
    date: new Date(),
  });

  const handleBarcodeScannerOpen = () => {
    dispatch(toggleBarcodeScanner());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(formData.quantity) <= 0) {
      alert('Quantity must be greater than 0');
      return;
    }

    const newStock =
      type === 'stock_out'
        ? product.stock - parseInt(formData.quantity)
        : product.stock + parseInt(formData.quantity);

    console.log(newStock);

    if (newStock < 0) {
      alert('Stock cannot be negative');
      return;
    }

    const log = {
      action: type === 'stock_in' ? 'stock_in' : 'stock_out',
      quantity: formData.quantity,
      note: formData.note,
      date: new Date().toISOString(),
    };

    dispatch(updateStock({ productId: formData.product_id, newStock }));

    dispatch(addLog(formData));
  };

  useEffect(() => {
    setFormData((prevData) =>
      prevData.product_id === ''
        ? { ...prevData, product_id: productId }
        : prevData
    );
  }, [productId]);

  useEffect(() => {
    if (formData.product_id) {
      dispatch(fetchProduct(formData.product_id));
    }
  }, [formData.product_id]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="product_id">Product ID:</label>
          <input
            id="product_id"
            name="product_id"
            type="text"
            value={formData.product_id}
            onChange={handleChange}
          />
          <button type="button" onClick={handleBarcodeScannerOpen}>
            Scan
          </button>
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            min={1}
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="note">Note:</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">
          {type === 'stock_in' ? 'Stock In' : 'Stock Out'}
        </button>
      </form>
    </div>
  );
};

StockForm.propTypes = {
  type: PropTypes.string.isRequired,
};

export default StockForm;
