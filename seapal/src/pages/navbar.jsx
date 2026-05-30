import { Link } from "react-router-dom";
import "./navbar.css";
import { useState } from "react";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="navbar">
      <section className="logo">
        {/*logo*/}
        <img src="logo.svg" />
        <img src="name.svg" />
      </section>

      <div className="links">
        <Link to="/" className="Link">
          Home
        </Link>
        <Link to="/gallery" className="Link">
          Gallery
        </Link>
        <Link to="/about" className="Link">
          About
        </Link>
        <Link to="/contact" className="Link">
          Contact
        </Link>
        <Link to="/inquire" className="inquire">
          Inquire
        </Link>
      </div>
    </nav>
  );
}
