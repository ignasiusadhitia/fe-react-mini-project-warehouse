import React from 'react';

import { StockForm } from 'components';

const StockOut = () => {
  return (
    <div>
      <h1>Stock Out</h1>
      <StockForm type="stock_out" />
    </div>
  );
};

export default StockOut;
