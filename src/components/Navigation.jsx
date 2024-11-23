import React from 'react';

import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Product List</Link>
        </li>
        <li>
          <Link to="/products/add">Add Product</Link>
        </li>
        <li>
          <Link to="/stock-in">Stock-In</Link>
        </li>
        <li>
          <Link to="/stock-out">Stock-Out</Link>
        </li>
        <li>
          <Link to="/logs">Logs</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
