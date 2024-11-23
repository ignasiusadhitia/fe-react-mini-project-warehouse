import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchLogs } from '../redux/slices/productSlice';
import { formatDate } from '../utils/utils';

const LogTable = () => {
  const { logs, error, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!logs?.length) {
    return <div>No products found</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Product ID</th>
          <th>Type</th>
          <th>Quantity</th>
          <th>Note</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {logs?.map((log, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{log.product_id}</td>
            <td>{log.type}</td>
            <td>{log.quantity}</td>
            <td>{log.note}</td>
            <td>{formatDate(log.date)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LogTable;
