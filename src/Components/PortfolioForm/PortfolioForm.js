import React, { useState } from "react";
import "./PortfolioForm.css";

const PortfolioForm = ({ onAddPortfolio }) => {
  const [name, setName] = useState("");
  const [investmentType, setInvestmentType] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleInvestmentTypeChange = (event) => {
    setInvestmentType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddPortfolio({ investmentAmount: name, investment_type: investmentType });
    setName("");
    setInvestmentType("");
  };

  return (
    <form className="portfolio-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="investmentAmount">Investment Amount:</label>
        <input
          type="text"
          id="investmentAmount"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter investment amount"
        />
      </div>
      <div className="form-group">
        <label htmlFor="investmentType">Investment Type:</label>
        <input
          type="text"
          id="investmentType"
          value={investmentType}
          onChange={handleInvestmentTypeChange}
          placeholder="Enter investment type"
        />
      </div>
      <button type="submit" disabled={!name || !investmentType}>
        Add Investment
      </button>
    </form>
  );
};

export default PortfolioForm;
