import React, { useState } from 'react';

const SearchBar = () => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search..."
        type="text"
        value={text || ''}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
