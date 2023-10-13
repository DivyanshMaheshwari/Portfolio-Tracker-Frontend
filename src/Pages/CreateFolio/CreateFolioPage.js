import React from 'react';
import PortfolioForm from '../PortfolioForm/PortfolioForm';

const CreateFolioPage = () => {
  const addPortfolio = (investmentAmount) => {
    // Implement the addPortfolio functionality here or pass it down to a parent component.
    console.log('Adding portfolio with investment amount:', investmentAmount);
  };

  return (
    <div>
      <h1>Create Folio</h1>
      <PortfolioForm onAddPortfolio={addPortfolio} />
    </div>
  );
};

export default CreateFolioPage;
