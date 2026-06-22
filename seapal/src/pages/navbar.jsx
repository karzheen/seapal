// Import NavLink instead of Link
import { NavLink } from "react-router-dom"; 
import "./navbar.css";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <nav className="navbar">
      <section className="logo">
        <img src="/seapal/logo.svg" alt="logo" />
        <img src="/seapal/name.svg" alt="brand name" />
      </section>

      {/* Hamburger Toggle Button */}
      <button className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu} aria-label="Toggle navigation">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Conditional mobile class applied via template literal */}
      <div className={`links ${isOpen ? "active" : ""}`}>
        <NavLink to="/" className="Link" onClick={() => setIsOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/gallery" className="Link" onClick={() => setIsOpen(false)}>
          Gallery
        </NavLink>
        <NavLink to="/about" className="Link" onClick={() => setIsOpen(false)}>
          About
        </NavLink>
        
        <div className="social-wrapper">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-link">
            <img src="/seapal/instagram.svg" alt="instagram icon" />  
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-link">
            <img src="/seapal/facebook.svg" alt="facebook icon" />
          </a>
        </div>
      </div>
    </nav>
  );
}
