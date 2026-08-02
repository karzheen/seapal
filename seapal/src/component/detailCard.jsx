import React, { useState, useEffect, useRef } from "react"; 
import "./detailCard.css";
import { useParams, useNavigate } from "react-router-dom";
import pics from "../data/picData"; 
import Suggestion from "./suggetion.jsx"; 
import BuyCard from "./buyCard";
import { formatDimensions } from "../utils/artworkDimensions";

export default function DetailCard({ artwork: propsArtwork }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const artwork = propsArtwork || pics.find((pic) => String(pic.id) === String(id));
  const artworkImages = artwork.images && artwork.images.length > 0 
    ? artwork.images 
    : [artwork.src];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [leavingIndex, setLeavingIndex] = useState(null);
  const [slideDirection, setSlideDirection] = useState(1);
  const animationTimeoutRef = useRef(null);
  const [aboutExpanded, setAboutExpanded] = useState(false);
 
  // --- INTERACTIVE ACCORDION STATE DRIVER ---
  const [accordionOpen, setAccordionOpen] = useState({
    about: true, 
    details: false,
    shipping: false
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const thumbnailRefs = useRef([]);
  const thumbnailStripRef = useRef(null);
  const touchStartX = useRef(null);
  const [showBottomFade, setShowBottomFade] = useState(false);
  const [showTopFade, setShowTopFade] = useState(false);

  // Re-sync active view state instantly on route parameter updates
  useEffect(() => {
    if (artwork) {
      setActiveImageIndex(0);
      setIsAnimating(false);
      setLeavingIndex(null);
    }
  }, [artwork]);

  useEffect(() => {
    artworkImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [artworkImages]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const goToIndex = (newIndex, direction) => {
    if (newIndex === activeImageIndex || isAnimating || artworkImages.length <= 1) return;

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    setSlideDirection(direction);
    setLeavingIndex(activeImageIndex);
    setIsAnimating(true);
    setActiveImageIndex(newIndex);

    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      setLeavingIndex(null);
      animationTimeoutRef.current = null;
    }, 480);
  };

  useEffect(() => {
    thumbnailRefs.current[activeImageIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [activeImageIndex]);

  useEffect(() => {
    const strip = thumbnailStripRef.current;
    if (!strip) return;

    const checkFade = () => {
      const hasScrollableThumbnails =
        artworkImages.length > 6 && strip.scrollHeight > strip.clientHeight + 1;

      if (!hasScrollableThumbnails) {
        setShowTopFade(false);
        setShowBottomFade(false);
        return;
      }

      const atTop = strip.scrollTop <= 1;
      const atBottom = strip.scrollTop + strip.clientHeight >= strip.scrollHeight - 1;
      setShowTopFade(!atTop);
      setShowBottomFade(!atBottom);
    };

    setTimeout(checkFade, 0);
    strip.addEventListener("scroll", checkFade);
    return () => {
      strip.removeEventListener("scroll", checkFade);
    };
  }, [artworkImages.length]);

  if (!artwork) {
    return (
      <div className="artwork-not-found">
        <h2>Artwork not found</h2>
        <button onClick={() => navigate("/gallery")}>Back to Gallery</button>
      </div>
    );
  }

  const handlePrevImage = () => {
    const prevIndex = activeImageIndex <= 0 ? artworkImages.length - 1 : activeImageIndex - 1;
    goToIndex(prevIndex, -1);
  };

  const handleNextImage = () => {
    const nextIndex = activeImageIndex >= artworkImages.length - 1 ? 0 : activeImageIndex + 1;
    goToIndex(nextIndex, 1);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const difference = touchStartX.current - touchEndX;

    if (difference > 50) {
      handleNextImage();
    }
    if (difference < -50) {
      handlePrevImage();
    }
    touchStartX.current = null;
  };

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
    <div className="detail-page-master-wrapper">
      <div className="detail-page-container">
        
        {/* LEFT SIDE: Media Presentation Window */}
        <div className="detail-media-column">
          <div className="main-image-viewport" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
 
            <button className="nav-arrow left-arrow" onClick={handlePrevImage}>
              <img src="/seapal/CaretLeft.svg" alt="Previous Image" />
            </button>
            
            <div className="carousel-stage">
              {isAnimating && leavingIndex !== null ? (
                <>
                  <img
                    key={`leave-${leavingIndex}`}
                    src={artworkImages[leavingIndex]}
                    className={`carousel-image is-leaving ${slideDirection > 0 ? "dir-next" : "dir-prev"}`}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                  />
                  <img
                    key={`enter-${activeImageIndex}`}
                    src={artworkImages[activeImageIndex]}
                    className={`carousel-image is-entering ${slideDirection > 0 ? "dir-next" : "dir-prev"}`}
                    alt={artwork.alt || "Artwork Display"}
                    draggable={false}
                  />
                </>
              ) : (
                <img
                  key={`current-${activeImageIndex}`}
                  src={artworkImages[activeImageIndex]}
                  className="carousel-image is-current"
                  alt={artwork.alt || "Artwork Display"}
                  draggable={false}
                />
              )}
            </div>
            
            <button className="nav-arrow right-arrow" onClick={handleNextImage}>
              <img src="/seapal/CaretRight.svg" alt="Next Image" />
            </button>
          </div>

          <div className={`thumbnail-strip-wrapper ${showBottomFade ? "has-bottom-fade" : ""} ${showTopFade ? "has-top-fade" : ""}`}>
            <div ref={thumbnailStripRef} className="thumbnail-preview-strip">
              {artworkImages.map((imgUrl, index) => (
                <div 
                  key={index} 
                  ref={(el) => (thumbnailRefs.current[index] = el)}
                  className={`thumb-item ${activeImageIndex === index ? "active" : ""}`}
                  onClick={() => {
                    if (index === activeImageIndex) return;
                    goToIndex(index, index > activeImageIndex ? 1 : -1);
                  }}
                >
                  <img src={imgUrl} alt={`${artwork.alt} view ${index + 1}`} />
                </div>
              ))}
            </div>
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
            <p>{formatDimensions(artwork)}</p>
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
              <img src="/seapal/return.svg" alt="Return Icon" className="badge-svg-icon" /> 
              14-Day Free Returns
            </p>
          </div>

          <details className="accordion-section" open={accordionOpen.about} onToggle={toggleSection("about")}>
            <summary>
              About the artwork
              <img src={accordionOpen.about ? "/seapal/chevron-up.svg" : "/seapal/chevron-down.svg"} alt="Toggle indicator" className="accordion-chevron-icon" />
            </summary>
            <div className="accordion-content">
             <p>
    {aboutExpanded
      ? (artwork.description ||
         "This beautiful piece combines expressive textures with a deep emotional resonance, capturing fleeting moments between memory and observation. Each brushstroke reflects the artist's ongoing exploration of the maritime environment and the quiet intimacy of botanical studies, rendered in heavy oils on raw linen.")
      : (artwork.description
          ? `${artwork.description.slice(0, 80)}...`
          : "This beautiful piece combines expressive textures...")}
    {" "}
    <span
      className="read-more"
      onClick={() => setAboutExpanded((prev) => !prev)}
    >
      {aboutExpanded ? "READ LESS" : "READ MORE"}
    </span>
  </p>
              <div className="meta-grid">
                <div className="meta-label">Year created:</div>
                <div className="meta-value">{artwork.date ? artwork.date.substring(0, 4) : artwork.year || "2024"}</div>
                <div className="meta-label">Subject:</div>
                <div className="meta-value underline-link" onClick={() => navigate(`/gallery?category=${artwork.subject}`)}>{artwork.subject}</div>
                <div className="meta-label">Mediums:</div>
                <div className="meta-value">{artwork.mediums}</div>
              </div>
            </div>
          </details>

          <details className="accordion-section" open={accordionOpen.details} onToggle={toggleSection("details")}>
            <summary>
              Details & Dimensions
              <img src={accordionOpen.details ? "/seapal/chevron-up.svg" : "/seapal/chevron-down.svg"} alt="Toggle indicator" className="accordion-chevron-icon" />
            </summary>
            <div className="accordion-content">
              <div className="meta-grid">
                <div className="meta-label">Rarity:</div>
                <div className="meta-value">{artwork.rarity || "One-of-a-kind Artwork"}</div>
                <div className="meta-label">Size:</div>
                <div className="meta-value">{formatDimensions(artwork)}</div>
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

          <details className="accordion-section" open={accordionOpen.shipping} onToggle={toggleSection("shipping")}>
            <summary>
              Shipping & Returns
              <img src={accordionOpen.shipping ? "/seapal/chevron-up.svg" : "/seapal/chevron-down.svg"} alt="Toggle indicator" className="accordion-chevron-icon" />
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
      <Suggestion currentArtwork={artwork} />
    </div>
  );
}
