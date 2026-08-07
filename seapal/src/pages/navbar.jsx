// Import NavLink instead of Link
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Locks background scroll while the mobile menu is open.
  // The actual scroll-lock rule (overflow:hidden) only fires inside the
  // @media (max-width: 800px) block in navbar.css, so this class is a
  // no-op on desktop/tablet even though it's toggled unconditionally here.
  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  return (
    <nav className="navbar">
      <div className="nav-background">
        <section
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src="/seapal/Logo.png" alt="logo" />
          <img src="/seapal/Logo-text.png" alt="brand name" />
        </section>

        {/* Hamburger Toggle Button */}
        <button
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Conditional mobile class applied via template literal */}
        <div className={`links ${isOpen ? "active" : ""}`}>
          <div className="nav-links-group">
            <NavLink to="/" className="Link" onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
            <NavLink
              to="/gallery"
              className="Link"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </NavLink>
            <NavLink
              to="/about"
              className="Link"
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
          </div>

          <div className="social-wrapper">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon-link"
            >
              <img src="/seapal/instagram.svg" alt="instagram icon" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon-link"
            >
              <img src="/seapal/facebook.svg" alt="facebook icon" />
            </a>
          </div>
          <div className="mobile-nav-images">
            <div className="mobile-image-box">
              <img src="/seapal/seapal-photo.webp" alt="" />
            </div>

            <div className="mobile-image-box">
              <img src="/seapal/Seapal-painting.webp" alt="" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
