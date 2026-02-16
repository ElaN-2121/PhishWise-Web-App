import React from "react";
import "../../styles/Button.css";

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`app-button ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;