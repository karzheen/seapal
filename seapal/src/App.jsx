import "./App.css"; 
import Navbar from "./pages/navbar"; 
import { Routes, Route, useLocation } from "react-router-dom"; 
import Home from "./pages/home"; 
import Gallery from "./pages/gallery"; 
import About from "./pages/about"; 
import DetailCard from "./component/detailCard"; 
import Footer from "./component/footer"; 
import { useEffect, useState } from "react"; 
import AdminDashboard from './pages/AdminDashboard';

function Layout({ children }) { 
  const location = useLocation(); 
  
  useEffect(() => { 
    window.scrollTo({ top: 0, left: 0, behavior: "auto" }); 
  }, [location.pathname]); 

  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname.startsWith("/admin");

  // Admin dashboard renders standalone — no site Navbar/Footer/wrapper.
  if (isAdminPage) {
    return <>{children}</>;
  }

  return ( 
    <div className={`layout ${isHomePage ? "home-layout-active" : "sub-page-layout-active"}`}> 
      {isHomePage && ( <div className="side-rec-line"></div> )} 
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

  // This runs AFTER React has actually committed the real page to the DOM
  // (i.e. after isLoading flips to false and the route tree re-renders),
  // not just after window "load" fires — so nothing is revealed until the
  // real content is truly painted underneath.
  useEffect(() => {
    if (isLoading) return;
    const root = document.getElementById("root");
    const mask = document.getElementById("loading-screen-gate");
    if (root) root.style.display = "block";
    if (mask) mask.remove();
  }, [isLoading]);

  if (isLoading) { 
    return null; 
  } 

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