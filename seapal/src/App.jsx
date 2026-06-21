import "./App.css";
import Navbar from "./pages/navbar";
import { Routes, Route, useLocation } from "react-router-dom"; 
import Home from "./pages/home";
import Gallery from "./pages/gallery";
import DetailCard from "./component/detailCard";
import Footer from "./component/footer";

function Layout({ children }) {
  const location = useLocation();
  
  // FIXED: Strict checking ensures this is ONLY true when the root homepage view is active
  const isHomePage = 
    location.pathname === "/" || 
    location.pathname === "/seapal" || 
    location.pathname === "/seapal/";

  return (
    <div className="layout">
      {/* Conditionally displays the side recording container ONLY on the active home route */}
      {isHomePage && (
        <div className="side-rec-line"></div>
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
        <Route path="/seapal" element={<Home />} />
        
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/detail/:id" element={<DetailCard />} />
      </Routes>
    </Layout>
  );
}
