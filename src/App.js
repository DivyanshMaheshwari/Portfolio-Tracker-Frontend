import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PortfolioList from "./Components/PortfolioList/PortfolioList";
import Login from "./Components/Login/Login";
import Signup from "./Components/SignUp/Signup";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/portfolio/list" element={<PortfolioList />} />
        <Route
          path="/portfolio/login"
          element={
            <Login
              onLogin={() => setIsLoggedIn(true)}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
