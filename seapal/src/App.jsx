import "./App.css";
import Navbar from "./pages/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Gallery from "./pages/gallery";
import DetailCard from "./component/detailCard";
/* FIX: Changed path structure from absolute "src/img/..." to relative "./img/..." */
import siderec from "./img/siderec.svg";
import Footer from "./component/footer";

function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />

      {children}

      {/* FIXED: Added explicit ID hook anchor */}
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
