import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const REACT_APP_ENDPOINT = process.env.REACT_APP_ENDPOINT;
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post(`${REACT_APP_ENDPOINT}/portfolio/login`, {
        email,
        password,
      });
      if (response.status === 200) {
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);
        onLogin(true);
      } 
      else if (response.status === 404) {
        setError("User is not registered in the database");
      } 
      else if (response.status === 401) {
        setError("Invalid email or password");
      } 
      else {
        setError("An error occurred while logging in");
        if (response.data && response.data.error) {
          // Handle the specific error from the response data
          setError(response.data.error);
        }
    
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred while logging in");
    }
    
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="current-email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
