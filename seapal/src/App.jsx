import "./App.css";
import Navbar from "./pages/navbar";
import { Routes, Route, useLocation } from "react-router-dom"; // Added useLocation
import Home from "./pages/home";
import Gallery from "./pages/gallery";
import DetailCard from "./component/detailCard";
import siderec from "./img/siderec.svg";
import Footer from "./component/footer";

function Layout({ children }) {
  const location = useLocation();
  
  // Checks if the current active route is strictly the Home path
  const isHomePage = location.pathname === "/";

  return (
    <div className="layout">
      {/* Conditionally displays the side recording line only on the home page */}
      {isHomePage && (
        <img src={siderec} alt="Decorative side line" className="side-rec-line" />
      )}

      <Navbar />

      {children}

      <footer id="site-footer"> 
        <Footer />
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/detail/:id" element={<DetailCard />} />
      </Routes>
    </Layout>
  );
}
