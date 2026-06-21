// Import NavLink instead of Link
import { NavLink } from "react-router-dom"; 
import "./navbar.css";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="navbar">
      <section className="logo">
        {/* Fixed: Prefixed with Vite BASE_URL to find logo.svg and name.svg directly inside the public folder root */}
        <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="logo" />
        <img src={`${import.meta.env.BASE_URL}name.svg`} alt="brand name" />
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
        
        {/* FIX: Prefixed with Vite BASE_URL to find social icons directly inside the public folder root */}
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-link">
          <img src={`${import.meta.env.BASE_URL}instagram.svg`} alt="instagram icon" />  
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-link">
          <img src={`${import.meta.env.BASE_URL}facebook.svg`} alt="facebook icon" />
        </a>
      </div>
    </nav>
  );
}
