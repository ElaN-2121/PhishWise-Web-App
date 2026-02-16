import React from "react";
import "../../styles/Footer.css";

const Footer = () => {
  const year = new Date().getFullYear(); // dynamic year
  return (
    <footer className="footer">
      <p>
        &copy; {year} PhishWise. All rights reserved.
      </p>
      <div className="footer-links">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/contact">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;