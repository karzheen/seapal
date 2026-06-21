// Import NavLink instead of Link
import { NavLink } from "react-router-dom"; 
import "./navbar.css";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="navbar">
      <section className="logo">
        {/* Fixed: Hardcoded the subfolder root path to guarantee resolution */}
        <img src="/seapal/logo.svg" alt="logo" />
        <img src="/seapal/name.svg" alt="brand name" />
      </section>

      <div className="links">
        <NavLink to="/" className="Link">
          Home
        </NavLink>
        <NavLink to="/gallery" className="Link">
          Gallery
        </NavLink>
        <NavLink to="/about" className="Link">
          About
        </NavLink>
        
        {/* Fixed: Hardcoded the subfolder root path to clear the social icon 404 errors */}
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-link">
          <img src="/seapal/instagram.svg" alt="instagram icon" />  
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-link">
          <img src="/seapal/facebook.svg" alt="facebook icon" />
        </a>
      </div>
    </nav>
  );
}
