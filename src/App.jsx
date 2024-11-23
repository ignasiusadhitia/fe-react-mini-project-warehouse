import React from 'react';

import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { BarcodeScanner, Navigation } from 'components';
import {
  Home,
  Logs,
  NotFound,
  ProductForm,
  ProductList,
  StockIn,
  StockOut,
} from 'pages';

function App() {
  const { showBarcodeScanner } = useSelector((state) => state.products);

  return (
    <Router>
      <Navigation />
      {showBarcodeScanner && <BarcodeScanner />}

      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<ProductList />} path="/products" />
        <Route element={<ProductForm />} path="/products/add" />
        <Route element={<ProductForm />} path="/products/edit/:id" />
        <Route element={<StockIn />} path="/stock-in" />
        <Route element={<StockOut />} path="/stock-out" />
        <Route element={<Logs />} path="/logs" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </Router>
  );
}

export default App;
