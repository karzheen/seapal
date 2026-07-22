import "./App.css";
import Navbar from "./pages/navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Gallery from "./pages/gallery";
import About from "./pages/about";
import DetailCard from "./component/detailCard";
import Footer from "./component/footer";
import { useEffect, useRef, useState } from "react";
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

// Waits for: native window "load", all fonts, and every <img> currently
// (or later) present inside `containerRef` — including images added after
// data fetches / route changes, via a MutationObserver.
function useFullPageLoaded(containerRef) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const pending = new Set();
    let observer;
    let timeoutId;

    const checkDone = () => {
      if (!cancelled && pending.size === 0) setLoaded(true);
    };

    const trackImage = (img) => {
      if (img.complete) return; // already loaded (e.g. from cache)
      pending.add(img);
      const settle = () => {
        pending.delete(img);
        img.removeEventListener("load", settle);
        img.removeEventListener("error", settle);
        checkDone();
      };
      img.addEventListener("load", settle);
      img.addEventListener("error", settle); // don't hang forever on a broken image
    };

    const scan = (node) => {
      if (node.tagName === "IMG") trackImage(node);
      node.querySelectorAll?.("img").forEach(trackImage);
    };

    if (containerRef.current) {
      scan(containerRef.current);

      observer = new MutationObserver((mutations) => {
        mutations.forEach((m) =>
          m.addedNodes.forEach((n) => {
            if (n.nodeType === 1) scan(n);
          })
        );
      });
      observer.observe(containerRef.current, { childList: true, subtree: true });
    }

    // Safety net: never block the reveal for more than 8s (slow/broken asset).
    timeoutId = setTimeout(() => !cancelled && setLoaded(true), 8000);

    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((res) => window.addEventListener("load", res, { once: true })),
    ]).then(checkDone);

    return () => {
      cancelled = true;
      observer?.disconnect();
      clearTimeout(timeoutId);
    };
  }, [containerRef]);

  return loaded;
}

export default function App() {
  const contentRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const fullyLoaded = useFullPageLoaded(contentRef);

  // Reveal only once everything has actually finished loading underneath.
  useEffect(() => {
    if (!fullyLoaded || revealed) return;
    const root = document.getElementById("root");
    const mask = document.getElementById("loading-screen-gate");
    if (root) root.style.visibility = "visible";
    if (mask) mask.remove();
    setRevealed(true);
  }, [fullyLoaded, revealed]);

  return (
    <div ref={contentRef} style={{ visibility: revealed ? "visible" : "hidden" }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/detail/:id" element={<DetailCard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </div>
  );
}