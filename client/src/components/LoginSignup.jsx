import React, { useState } from "react";
import "../CSS/LoginSignup.css";

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="login-container">
      {isSignup ? (
        <form className="login-form">
          <h2>Sign Up</h2>
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => setIsSignup(false)}
            className="switch-btn"
          >
            Switch to Login
          </button>
        </form>
      ) : (
        <form className="signup-form">
          <h2>Login</h2>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="login-btn">
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsSignup(true)}
            className="switch-btn"
          >
            Switch to Sign Up
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginSignup;
