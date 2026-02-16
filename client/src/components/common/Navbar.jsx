import React, { useState } from "react"; // 1. Import useState
import "../../styles/Navbar.css";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Button from "./Button.jsx";

const Navbar = ({ toggleTheme, isDark }) => {
  // 2. State for mobile menu
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={Logo} alt="PhishWise Logo" className="logo-image" />
        <span className="logo-text">PhishWise</span>
      </Link>

      {/* 3. Add a Hamburger Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
      </div>

      {/* 4. Conditionally add 'active' class to links */}
      <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
        <li>
          <NavLink to="/" end onClick={() => setIsOpen(false)}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/learn" onClick={() => setIsOpen(false)}>Learn</NavLink>
        </li>
        <li>
          <NavLink to="/quiz" onClick={() => setIsOpen(false)}>Quizzes</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/login" onClick={() => setIsOpen(false)}>Login</NavLink>
        </li>
      </ul>

      <Button className="theme-btn" onClick={toggleTheme}>
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </Button>
    </nav>
  );
};

export default Navbar;