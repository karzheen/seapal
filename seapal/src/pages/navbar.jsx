// Import NavLink instead of Link
import { NavLink } from "react-router-dom"; 
import "./navbar.css";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="navbar">
      <section className="logo">
        {/* Fixed: Injected Vite base URL variable to dynamically match GitHub subfolder paths */}
        <img src={`${import.meta.env.BASE_URL}img/logo.svg`} alt="logo" />
        <img src={`${import.meta.env.BASE_URL}img/name.svg`} alt="brand name" />
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
        
        {/* FIX: Injected Vite base URL variable to dynamically fix social media icon 404s */}
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-link">
          <img src={`${import.meta.env.BASE_URL}img/instagram.svg`} alt="instagram icon" />  
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-link">
          <img src={`${import.meta.env.BASE_URL}img/facebook.svg`} alt="facebook icon" />
        </a>
      </div>
    </nav>
  );
}
