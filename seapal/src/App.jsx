import "./App.css"; 
import Navbar from "./pages/navbar"; 
import { Routes, Route, useLocation } from "react-router-dom"; 
import Home from "./pages/home"; 
import Gallery from "./pages/gallery"; 
import About from "./pages/about"; 
import DetailCard from "./component/detailCard"; 
import Footer from "./component/footer"; 
import { useEffect, useState, useLayoutEffect } from "react"; 
import AdminDashboard from './pages/AdminDashboard'; 

function Layout({ children }) { 
  const location = useLocation(); 

  useEffect(() => { 
    window.scrollTo({ top: 0, left: 0, behavior: "auto" }); 
  }, [location.pathname]); 

  const isHomePage = location.pathname === "/"; 
  const isAdminPage = location.pathname.startsWith("/admin"); 

  if (isAdminPage) { 
    return <>{children}</>; 
  } 

  return ( 
    <div className={`layout ${isHomePage ? "home-layout-active" : "sub-page-layout-active"}`}> 
      {isHomePage && <div className="side-rec-line"></div>} 
      <Navbar /> 
      {children} 
      <footer id="site-footer"> 
        <Footer /> 
      </footer> 
    </div> 
  ); 
} 

export default function App() { 
  const [isLoading, setIsLoading] = useState(true); 

  // Step 1: Wait for all heavy static assets (window load event)
  useEffect(() => { 
    const handleReveal = () => { 
      setIsLoading(false); 
    }; 

    if (document.readyState === "complete") { 
      handleReveal(); 
    } else { 
      window.addEventListener("load", handleReveal); 
      return () => window.removeEventListener("load", handleReveal); 
    } 
  }, []); 

  // Step 2: Unveil the DOM smoothly before the browser paints
  useLayoutEffect(() => { 
    if (isLoading) return; 

    const root = document.getElementById("root");
    const mask = document.getElementById("loading-screen-gate"); 

    // Override the strict "display: none" from index.html
    if (root) {
      root.style.display = "block"; 
    }

    if (mask) {
      mask.style.transition = "opacity 0.3s ease";
      mask.style.opacity = "0"; 
      setTimeout(() => mask.remove(), 300); // Clean up mask wrapper from DOM
    } 
  }, [isLoading]); 

  // Keep the component rendering tree intact so React can build the initial DOM layout hidden from view
  return ( 
    <Layout> 
      <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<About />} /> 
        <Route path="/gallery" element={<Gallery />} /> 
        <Route path="/detail/:id" element={<DetailCard />} /> 
        <Route path="/admin" element={<AdminDashboard />} /> 
      </Routes> 
    </Layout> 
  ); 
}
