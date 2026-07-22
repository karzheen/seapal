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
import LoadingBar from './component/LoadingBar'; 

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
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

  useEffect(() => { 
    const handleReveal = () => { 
      setIsAssetsLoaded(true); // Your assets are 100% loaded; let the progress bar hit 100
    }; 

    if (document.readyState === "complete") { 
      handleReveal(); 
    } else { 
      window.addEventListener("load", handleReveal); 
      return () => window.removeEventListener("load", handleReveal); 
    } 
  }, []); 

  const handleLoadingComplete = () => {
    setIsLoading(false); 
    
    // 1. Find the root element and override "display: none" from index.html
    const root = document.getElementById("root"); 
    if (root) { 
      root.style.display = "block"; 
    } 

    // 2. Remove the loading gate mask element completely from the DOM
    const mask = document.getElementById("loading-screen-gate"); 
    if (mask) { 
      mask.remove(); 
    }
  };

  return ( 
    <>
      {/* 1. This displays your numerical count up smoothly until everything is safe */}
      {isLoading && (
        <LoadingBar 
          isAssetsLoaded={isAssetsLoaded} 
          onComplete={handleLoadingComplete} 
        />
      )}

      {/* 2. Your native working layout tree continues loading 100% perfectly in the background */}
      <Layout> 
        <Routes> 
          <Route path="/" element={<Home />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/gallery" element={<Gallery />} /> 
          <Route path="/detail/:id" element={<DetailCard />} /> 
          <Route path="/admin" element={<AdminDashboard />} /> 
        </Routes> 
      </Layout> 
    </>
  ); 
}
