// Import NavLink instead of Link
import { NavLink } from "react-router-dom"; 
import "./navbar.css";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="navbar">
      <section className="logo">
        {/* Fixed: Added /img/ prefix to resolve the branding vectors correctly */}
        <img src="/img/logo.svg" alt="logo" />
        <img src="/img/name.svg" alt="brand name" />
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
        
        {/* FIX: Use standard anchor elements for external social media routes */}
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-link">
          <img src="img/instagram.svg" alt="instagram icon" />  
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-link">
          <img src="img/facebook.svg" alt="facebook icon" />
        </a>
      </div>
    </nav>
  );
}
