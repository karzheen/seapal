import React, { useState, useEffect } from "react"; 
import "./detailCard.css";
import { useParams, useNavigate } from "react-router-dom";
import pics from "../data/picData"; 
import Suggestion from "./suggetion.jsx"; 
import BuyCard from "./buyCard";

export default function DetailCard({ artwork: propsArtwork }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const artwork = propsArtwork || pics.find((pic) => String(pic.id) === String(id));

  const [activeImage, setActiveImage] = useState(artwork?.src || "");

  // --- INTERACTIVE ACCORDION STATE DRIVER ---
  const [accordionOpen, setAccordionOpen] = useState({
    about: true, // First accordion displays open by default
    details: false,
    shipping: false
  });
  const [showCheckout, setShowCheckout] = useState(false);
  // Re-sync active view state instantly on route parameter updates
  useEffect(() => {
    if (artwork) {
      setActiveImage(artwork.src);
    }
  }, [artwork]);

  if (!artwork) {
    return (
      <div className="artwork-not-found">
        <h2>Artwork not found</h2>
        <button onClick={() => navigate("/gallery")}>Back to Gallery</button>
      </div>
    );
  }

  const artworkImages = artwork.images && artwork.images.length > 0 
    ? artwork.images 
    : [artwork.src];

  const handlePrevImage = () => {
    const currentIndex = artworkImages.indexOf(activeImage);
    const prevIndex = currentIndex <= 0 ? artworkImages.length - 1 : currentIndex - 1;
    setActiveImage(artworkImages[prevIndex]);
  };

  const handleNextImage = () => {
    const currentIndex = artworkImages.indexOf(activeImage);
    const nextIndex = currentIndex >= artworkImages.length - 1 ? 0 : currentIndex + 1;
    setActiveImage(artworkImages[nextIndex]);
  };

  // Toggle utility captures the native html summary action triggers
  const toggleSection = (section) => (e) => {
    setAccordionOpen((prev) => ({
      ...prev,
      [section]: e.target.open
    }));
  };

  const formattedPrice = typeof artwork.price === 'number' 
    ? `$${artwork.price.toLocaleString()}` 
    : artwork.price;

  return (
    /* GLOBAL MASTER OVERVIEW WRAPPER CONTAINER */
    <div className="detail-page-master-wrapper">
      
      {/* TWO COLUMN CONTENT PANEL SPLIT */}
      <div className="detail-page-container">
        {/* LEFT SIDE: Media Presentation Window */}
        <div className="detail-media-column">
          <div className="main-image-viewport">
            {/* CAROUSEL CONTROLS */}
            <button className="nav-arrow left-arrow" onClick={handlePrevImage}>
              <img src="/seapal/CaretLeft.svg" alt="Previous Image" />
            </button>
            <img 
              src={activeImage || artwork.src} 
              alt={artwork.alt || "Artwork Display"} 
            />
            <button className="nav-arrow right-arrow" onClick={handleNextImage}>
              <img src="/seapal/CaretRight.svg" alt="Next Image" />
            </button>
          </div>

          <div className="thumbnail-preview-strip">
            {artworkImages.map((imgUrl, index) => (
              <div 
                key={index} 
                className={`thumb-item ${activeImage === imgUrl ? "active" : ""}`}
                onClick={() => setActiveImage(imgUrl)}
              >
                <img src={imgUrl} alt={`${artwork.alt} view ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Product Details Content */}
        <div className="detail-card">
          <h1 className="artwork-title">
            {artwork.alt || "Untitled"}, <span className="title-year">{artwork.year || "2024"}</span>
          </h1>
          <h2 className="artist-name">Seapal Nadhim</h2>

          <div className="primary-specs">
            <p>{artwork.mediums || "Oil on Canvas"}</p>
            <p>{artwork.width} W x {artwork.height} H cm</p>
            <p className="ready-to-hang">Ready to Hang ⓘ</p>
          </div>

          <div className="purchase-section">
            <p className="artwork-price">{formattedPrice}</p>
             
      <button className="buy-button" onClick={() => setShowCheckout(true)}>
        Buy this artwork
      </button>
       {showCheckout && (
        <BuyCard artwork={artwork} onClose={() => setShowCheckout(false)} />
      )}
          </div>

          <div className="trust-badges">
            <p>
              <img src="/seapal/Truck.svg" alt="Shipping Icon" className="badge-svg-icon" /> 
              Shipping Included
            </p>
            <p>
              <img src="/seapal/Return.svg" alt="Return Icon" className="badge-svg-icon" /> 
              14-Day Free Returns
            </p>
          </div>

          {/* Accordion 1: About the artwork */}
          <details 
            className="accordion-section" 
            open={accordionOpen.about} 
            onToggle={toggleSection("about")}
          >
            <summary>
              About the artwork
              <img 
                src={accordionOpen.about ? "/seapal/chevron-up.svg" : "/seapal/chevron-down.svg"} 
                alt="Toggle indicator arrow" 
                className="accordion-chevron-icon" 
              />
            </summary>
            <div className="accordion-content">
              <p>This beautiful piece combines expressive textures... <span className="read-more">READ MORE</span></p>
              <div className="meta-grid">
                <div className="meta-label">Year created:</div>
                <div className="meta-value">{artwork.date ? artwork.date.substring(0, 4) : artwork.year || "2024"}</div>
                <div className="meta-label">Subject:</div>
                <div className="meta-value underline-link">{artwork.subject}</div>
                <div className="meta-label">Mediums:</div>
                <div className="meta-value underline-link">{artwork.mediums}</div>
              </div>
            </div>
          </details>

          {/* Accordion 2: Details & Dimensions */}
          <details 
            className="accordion-section" 
            open={accordionOpen.details} 
            onToggle={toggleSection("details")}
          >
            <summary>
              Details & Dimensions
              <img 
                src={accordionOpen.details ? "/seapal/chevron-up.svg" : "/seapal/chevron-down.svg"} 
                alt="Toggle indicator arrow" 
                className="accordion-chevron-icon" 
              />
            </summary>
            <div className="accordion-content">
              <div className="meta-grid">
                <div className="meta-label">Rarity:</div>
                <div className="meta-value">{artwork.rarity || "One-of-a-kind Artwork"}</div>
                <div className="meta-label">Size:</div>
                <div className="meta-value">{artwork.width} W x {artwork.height} H cm</div>
                <div className="meta-label">Ready to Hang:</div>
                <div className="meta-value">{artwork.readyToHang || "Yes"}</div>
                <div className="meta-label">Framed:</div>
                <div className="meta-value">{artwork.framed || "Yes"}</div>
                <div className="meta-label">Authenticity:</div>
                <div className="meta-value">{artwork.authenticity || "Certificate is Included"}</div>
                <div className="meta-label">Packaging:</div>
                <div className="meta-value">{artwork.packaging || "Framed & Protected"}</div>
              </div>
            </div>
          </details>

          {/* Accordion 3: Shipping & Returns */}
          <details 
            className="accordion-section" 
            open={accordionOpen.shipping} 
            onToggle={toggleSection("shipping")}
          >
            <summary>
              Shipping & Returns
              <img 
                src={accordionOpen.shipping ? "/seapal/chevron-up.svg" : "/seapal/chevron-down.svg"} 
                alt="Toggle indicator arrow" 
                className="accordion-chevron-icon" 
              />
            </summary>
            <div className="accordion-content">
              <div className="meta-grid">
                <div className="meta-label">Delivery Cost:</div>
                <div className="meta-value">{artwork.deliveryCost || "Shipping is included in price."}</div>
                <div className="meta-label">Delivery Time:</div>
                <div className="meta-value">{artwork.deliveryTime || "Typically 5-7 business days."}</div>
                <div className="meta-label">Returns:</div>
                <div className="meta-value">{artwork.returns || "Free returns within 14 days of delivery."}</div>
                <div className="meta-label">Handling:</div>
                <div className="meta-value">{artwork.handling || "Delivered framed and protected for transit."}</div>
                <div className="meta-label">Ships from:</div>
                <div className="meta-value">{artwork.shipsFrom || "Erbil, Iraq."}</div>
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* PLACED FULL WIDTH DIRECTLY UNDERNEATH BOTH COLUMNS */}
      <Suggestion currentArtwork={artwork} />
    
    </div>
  );
}
