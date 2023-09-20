import React, { useState, useEffect } from "react";
import axios from "axios";
import PortfolioForm from "../PortfolioForm/PortfolioForm";
import "./PortfolioList.css"; // Import the CSS file

const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    // Fetch portfolios when the component mounts
    axios
      .get("http://localhost:8081/portfolio/list")
      .then((response) => {
        setPortfolios(response.data);
      })
      .catch((error) => console.error("Error fetching portfolios: ", error));
  }, []);

  const generateRandomFolio = () => {
    const folio = Math.floor(100000 + Math.random() * 900000); // Generates a six-digit random number
    return folio;
  };

  const addPortfolio = (investmentAmount) => {
    const folio = generateRandomFolio(); // Generate a unique folio
    axios
      .post("http://localhost:8081/portfolio/create", {
        investmentAmount,
        folio, // Include the generated folio in the request
      })
      .then((response) => {
        setPortfolios([...portfolios, response.data]);
      })
      .catch((error) => console.error("Error adding portfolio: ", error));
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioList;