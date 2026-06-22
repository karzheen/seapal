import "./footer.css";  
import { NavLink } from "react-router-dom"; 

export default function Footer() {
  return (
    <footer className="footer-container">
      {/* Background image tracks container space */}
      <img src="/seapal/Frame.svg" alt="Footer Background" className="footer-bg" />

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
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-link">
                <img src="/seapal/instagram.svg" alt="instagram icon" />  
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-link">
                <img src="/seapal/facebook.svg" alt="facebook icon" />
              </a>
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
