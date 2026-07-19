import "./App.css"; 
import Navbar from "./pages/navbar"; 
import { Routes, Route, useLocation } from "react-router-dom"; 
import Home from "./pages/home"; 
import Gallery from "./pages/gallery"; 
import About from "./pages/about"; 
import DetailCard from "./component/detailCard"; 
import Footer from "./component/footer"; 
import { useEffect, useState } from "react"; 
import Loader from "./component/Loader"; 


function Layout({ children }) { 
  const location = useLocation(); 
  
  useEffect(() => { 
    window.scrollTo({ top: 0, left: 0, behavior: "auto" }); 
  }, [location.pathname]); 


 const isHomePage = location.pathname === "/";

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
    // Check if the page is already fully loaded
    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      const handleLoad = () => setIsLoading(false);
      
      // Listen for the native window load event
      window.addEventListener("load", handleLoad);
      
      // Clean up the event listener
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []); 

  // Hide the layout and content until loading is complete
  if (isLoading) {
    return <Loader />;
  }

  return ( 
    <Layout> 
      <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<About />} /> 
        <Route path="/gallery" element={<Gallery />} /> 
        <Route path="/detail/:id" element={<DetailCard />} /> 
      </Routes> 
    </Layout> 
  ); 
}
