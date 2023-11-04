import React, { useState, useEffect } from "react";
import axios from "axios";
import PortfolioForm from "../PortfolioForm/PortfolioForm";
import Login from "../Login/Login"; // Import the Login component
import "./PortfolioList.css";
import "font-awesome/css/font-awesome.min.css";

const REACT_APP_ENDPOINT = process.env.REACT_APP_ENDPOINT;
const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get(`${REACT_APP_ENDPOINT}/portfolio/list`)
      .then((response) => {
        setPortfolios(response.data);
      })
      .catch((error) => console.error("Error fetching portfolios: ", error));
  }, []);

  const addPortfolio = (investmentAmount, investment_type) => {
    axios
      .post(`${REACT_APP_ENDPOINT}/portfolio/create`, {
        investmentAmount,
        investment_type,
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
          (portfolio) => portfolio.investment_id !== id
        );
        setPortfolios(updatedPortfolios);
      })
      .catch((error) => console.error("Error deleting portfolio: ", error));
  };

  return (
    <div className="portfolio-list-container">
      {isLoggedIn ? (
        <div>
          <h1 className="portfolio-list-title">Portfolio List</h1>
          <PortfolioForm onAddPortfolio={(data) => addPortfolio(data.investmentAmount,data.investment_type)} />
          <ul className="portfolio-list">
            {portfolios.map((portfolio) => (
              <li key={portfolio.investment_id}>
                Investment Type : <span>{portfolio.investment_type}</span>,
                Investment Amount: <span>{portfolio.investmentAmount}</span>
                <button
                  className="delete-button"
                  onClick={() => handleDeletePortfolio(portfolio.investment_id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Login onLogin={setIsLoggedIn} />
      )}
    </div>
  );
};

export default PortfolioList;
