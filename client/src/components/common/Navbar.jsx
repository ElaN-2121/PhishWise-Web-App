import React, { useState, useEffect } from "react";
import "../../styles/Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Button from "./Button.jsx";

const Navbar = ({ toggleTheme, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={Logo} alt="PhishWise Logo" className="logo-image" />
        <span className="logo-text">PhishWise</span>
      </Link>

      <div className="menu-icon" onClick={toggleMenu}>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
      </div>

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

        {/* Show Dashboard only if logged in */}
        {user && (
          <li>
            <NavLink to="/dashboard" onClick={() => setIsOpen(false)}>
              Dashboard
            </NavLink>
          </li>
        )}

        {/* If NOT logged in → show Login */}
        {!user && (
          <li>
            <NavLink to="/login" onClick={() => setIsOpen(false)}>
              Login
            </NavLink>
          </li>
        )}

        {/* If logged in → show Logout */}
        {user && (
          <li>
            <NavLink className="logout-btn" onClick={handleLogout}>
              Logout
            </NavLink>
          </li>
        )}
      </ul>

      <Button className="theme-btn" onClick={toggleTheme}>
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </Button>
    </nav>
  );
};

export default Navbar;
