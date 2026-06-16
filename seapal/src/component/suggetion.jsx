import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pics from "../data/picData";
import "./suggestion.css";
import LeftArrow from "../img/CaretLeft.svg";
import RightArrow from "../img/CaretRight.svg";

export default function Suggestion({ currentArtwork }) {
  const navigate = useNavigate();

  if (!currentArtwork) return null;

  const eligibleArtworks = pics.filter(
    (pic) => String(pic.id) !== String(currentArtwork.id)
  );

  const matchingArtworks = eligibleArtworks.filter(
    (pic) => pic.subject === currentArtwork.subject
  );

  const pool = matchingArtworks.length >= 3 ? matchingArtworks : eligibleArtworks;

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setStartIndex(0);
  }, [currentArtwork]);

  const visibleSuggestions = pool.slice(startIndex, startIndex + 3);

  const handlePrev = () => {
    setStartIndex((prevIndex) => {
      if (prevIndex === 0) {
        return Math.max(0, pool.length - 3);
      }
      return prevIndex - 1;
    });
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => {
      if (prevIndex >= pool.length - 3) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const handleSelection = (id) => {
    navigate(`/detail/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  return (
    <div className="recommendations-row-block">
      <div className="rec-header-ribbon">
        <h2 className="rec-row-title">You might also like</h2>
        
        <div className="rec-arrow-controls">
          {/* UPDATED TO RENDER VECTOR IMAGE COMPONENTS */}
          <button className="rec-arrow-btn" onClick={handlePrev}>
            <img src={LeftArrow} alt="Previous" />
          </button>
          <button className="rec-arrow-btn" onClick={handleNext}>
            <img src={RightArrow} alt="Next" />
          </button>
        </div>
      </div>

      <div className="rec-items-three-grid">
        {visibleSuggestions.map((rec) => (
          <div 
            key={rec.id} 
            className="rec-product-card"
            onClick={() => handleSelection(rec.id)}
          >
            <div className="rec-image-box">
              <img src={rec.src} alt={rec.alt || "Artwork recommendation"} />
            </div>
            <div className="rec-product-info">
              <p className="rec-product-price">${rec.price?.toLocaleString()}</p>
              <h4 className="rec-product-title">{rec.alt || "Untitled Artwork"}</h4>
              <p className="rec-product-dims">{rec.width} × {rec.height} cm</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
