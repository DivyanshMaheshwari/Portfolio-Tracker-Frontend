import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const REACT_APP_ENDPOINT = process.env.REACT_APP_ENDPOINT;
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleErrorResponse = (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        return "Invalid email or password";
      } else if (error.response.status === 404) {
        return "User is not registered in the database";
      }
    }
    return "An error occurred while logging in";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        `${REACT_APP_ENDPOINT}/portfolio/login`,
        {
          email,
          password,
        }
      );
      onLogin(true);
      navigate("/portfolio/list");
      console.log("Login: " + response.data);
    } catch (error) {
      setError(handleErrorResponse(error));
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
        <div>
          <p>
            Don't have an account? <Link to="/Signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
