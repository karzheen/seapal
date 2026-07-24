import "./App.css"; 
import Navbar from "./pages/navbar"; 
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/home"; 
import Gallery from "./pages/gallery"; 
import About from "./pages/about"; 
import DetailCard from "./component/detailCard"; 
import Footer from "./component/footer";  
import Loader from "./component/Loader"; 
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

  useEffect(() => { 
    const checkEverythingLoaded = async () => {
      // 1. Wait for images and standard DOM assets
      if (document.readyState !== "complete") {
        await new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
      }
      
      // 2. Wait for Google Fonts / Custom Web Fonts to fully render
      if (document.fonts) {
        await document.fonts.ready;
      }

      setIsLoading(false); 
    }; 

    checkEverythingLoaded();
  }, []); 

  useLayoutEffect(() => { 
    if (isLoading) return; 

    const root = document.getElementById("root");
    const mask = document.getElementById("loading-screen-gate"); 

    if (root) {
      root.style.display = "block"; 
    }

    // 3. Double requestAnimationFrame guarantees the browser has executed 
    // the layout and painted the hidden page before removing the mask.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (mask) {
          mask.style.transition = "opacity 0.4s ease";
          mask.style.opacity = "0"; 
          setTimeout(() => mask.remove(), 400); 
        } 
      });
    });
  }, [isLoading]); 

  return ( 
    <Layout> 
      {isLoading && <Loader />} 
    
      <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<About />} /> 
        <Route path="/gallery" element={<Gallery />} /> 
        <Route path="/detail/:id" element={<DetailCard />} /> 

          <Route path="/seapal" element={<Home />} />
          <Route path="/seapal/" element={<Home />} />
      </Routes> 
    </Layout> 
  ); 
}
