import React, { useState, useEffect } from "react";
import axios from "axios";
import PortfolioForm from "../PortfolioForm/PortfolioForm";
import "./PortfolioList.css";
import "font-awesome/css/font-awesome.min.css";


const REACT_APP_ENDPOINT = process.env.REACT_APP_ENDPOINT
const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState([]);
 useEffect(() => {
    // Fetch portfolios when the component mounts
    axios
      .get(`${REACT_APP_ENDPOINT}/portfolio/list`)
      .then((response) => {
        setPortfolios(response.data);
      })
      .catch((error) => console.error("Error fetching portfolios: ", error));
  }, []);

  const addPortfolio = (investmentAmount, folioNumber) => {
    axios
      .post(`${REACT_APP_ENDPOINT}/portfolio/create`, {
        investmentAmount,
        folioNumber,
      })
      .then((response) => {
        setPortfolios([...portfolios, response.data]);
      })
      .catch((error) => console.error("Error adding portfolio: ", error));
  };

  const handleDeletePortfolio = (id) => {
    axios
      .delete(`${REACT_APP_ENDPOINT}/portfolio/delete/${id}`)
      .then(() => {
        // Update portfolios after deletion
        const updatedPortfolios = portfolios.filter(
          (portfolio) => portfolio.portfolio_id !== id
        );
        setPortfolios(updatedPortfolios);
      })
      .catch((error) => console.error("Error deleting portfolio: ", error));
  };
  return (
    <div className="portfolio-list-container">
      <h1 className="portfolio-list-title">Portfolio List</h1>
      <PortfolioForm onAddPortfolio={addPortfolio} />

      <ul className="portfolio-list">
        {portfolios.map((portfolio) => (
          <li key={portfolio.portfolio_id}>
            Folio: <span>{portfolio.portfolio_id}</span>, Investment Amount:{" "}
            <span>{portfolio.investmentAmount}</span>
            <button className="delete-button"
              onClick={() => handleDeletePortfolio(portfolio.portfolio_id)}
            >
                <i className="fas fa-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioList;
