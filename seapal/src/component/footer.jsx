import "./footer.css";  
import footerFrame from "../img/Frame.svg"; 
import instagram from "../img/instagram.svg";
import facebook from "../img/facebook.svg";
import { NavLink } from "react-router-dom"; 
export default function Footer() {
  return (
    <footer className="footer-container">
      {/* Background Image */}
      <img src={footerFrame} alt="Footer Background" className="footer-bg" />

      {/* Overlay Content */}
      <div className="footer-overlay">
        
        {/* Top Navigation Row */}
        <div className="footer-top">
          <div className="footer-column">
            <h3>Brand Statement</h3>
          </div>
          
          <div className="footer-column">
            <h3>Navigate</h3>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/gallery">Gallery</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </div>
          
          <div className="footer-column contact-column">
            <h3>Contact</h3>
            <p><a href="mailto:Seapal.nadhim@gmail.com">Seapal.nadhim@gmail.com</a></p>
            <p>Commissions open . 2025</p>
            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><img src={instagram} alt="Instagram" /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer"><img src={facebook} alt="Facebook" /></a>
            </div>
          </div>
        </div>

        {/* Bottom Logo & Copyright Row */}
        <div className="footer-bottom">
          
          <p className="copyright">© 2025 Seapal Nadhim</p>
        </div>

      </div>
    </footer>
  );
}
