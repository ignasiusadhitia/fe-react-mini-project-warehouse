import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Warehouse Inventory</h1>
      <p>Welcome to the warehouse inventory system!</p>
      <ul>
        <li>
          Total Product: <strong>120</strong>
        </li>
        <li>
          Low Stock Product: <strong>5</strong>
        </li>
        <li>
          Last log activity: <strong>12 minutes ago</strong>
        </li>
      </ul>
    </div>
  );
};

export default Home;
