import React from "react";
import "../../styles/auth.css"; 

const AuthWrapper = ({ children }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
