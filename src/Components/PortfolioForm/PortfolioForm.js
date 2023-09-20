import React, { useState } from 'react';
import './PortfolioForm.css';

const PortfolioForm = ({ onAddPortfolio }) => {
  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddPortfolio(name);
    setName('');
  };

  return (
    <form className="portfolio-form" onSubmit={handleSubmit}>
      <label htmlFor="investmentAmount">Investment Amount:</label>
      <input
        type="text"
        id="investmentAmount"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter investment amount"
      />
      <button type="submit" disabled={!name}>
        Add Investment
      </button>
    </form>
  );
};

export default PortfolioForm;
