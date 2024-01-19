import React, { useState } from 'react';

const Zoekbalk = ({ placeholder, data, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <div>
      <section className='Zoekbalk'>
        <input
          type='text'
          className='OnderzoekSearchInput'
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className='search' onClick={handleSearch}>
          <div className='search-icon'>&#128269;</div>
        </button>
      </section>
    </div>
  );
};

export { Zoekbalk };
