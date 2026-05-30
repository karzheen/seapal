import "./App.css";
import Navbar from "./pages/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Gallery from "./pages/gallery";
import About from "./pages/about";
import Contact from "./pages/contact";
import Inquire from "./pages/inquire";
import Footer from "./component/footer";
function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />

      {children}

      <footer>
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
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/inquire" element={<Inquire />} />
      </Routes>
    </Layout>
  );
}
