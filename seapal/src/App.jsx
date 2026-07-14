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
import AudioPlayer from "./component/AudioPlayer"; // 1. Imported the invisible player here

function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  const isHomePage = (location.pathname === "/" || location.pathname === "/seapal" || location.pathname === "/seapal/") && !location.pathname.includes("/detail") && !location.pathname.includes("/gallery");

  return (
    <div className={`layout ${isHomePage ? "home-layout-active" : "sub-page-layout-active"}`}>
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <Layout>
      {/* Renders the top loading line over everything else if isLoading is true */}
      {isLoading && <Loader />}
      
      {/* 2. Placed here: Plays audio invisibly across all pages without layout shifts */}
      <AudioPlayer />
      
      {/* The website routes remain visible and render immediately */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seapal" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/detail/:id" element={<DetailCard />} />
      </Routes>
    </Layout>
  );
}
