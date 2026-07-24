import Filter from "../component/filter";
import "./gallery.css";
import pics from "../data/picData";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Artwork from "../component/artwork";
import { getDimensions, getSizeBucket, formatDimensionsShort, getOrientation } from "../utils/artworkDimensions";
import { distributeIntoColumns, useGalleryColumnCount } from "../utils/galleryLayout";

const GALLERY_PAGE_SIZE = 12;

export default function Gallery() {
  const [showfilters, setshowfilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
console.log("showfilters:", showfilters);
  const [activeFilters, setActiveFilters] = useState({
    sort: "newest",
    subjects: [],
    sizes: [],
    priceRange: null,
    orientations: [],
    minWidth: "",
    maxWidth: "",
    minHeight: "",
    maxHeight: "",
    minPrice: "", 
    maxPrice: ""  
  });
  const [searchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(GALLERY_PAGE_SIZE);


  const [renderSidebar, setRenderSidebar] = useState(false);

useEffect(() => {
  if (showfilters) {
    setRenderSidebar(true);
  } else {
    const timer = setTimeout(() => {
      setRenderSidebar(false); // <-- delayed unmount
    }, 300);

    return () => clearTimeout(timer);
  }
}, [showfilters]);

useEffect(() => {
  const category = searchParams.get("category");

  if (category) {
    setActiveFilters((prev) => ({
      ...prev,
      subjects: [category]
    }));
  }
}, [searchParams]);

  // --- DYNAMIC COUNTER CALCULATION ENGINE ---
  // Calculates the number next to HIDE FILTERS (e.g., "(2)")
  const activeCount = 
    activeFilters.subjects.length + 
    activeFilters.sizes.length + 
    activeFilters.orientations.length + 
    (activeFilters.priceRange ? 1 : 0) +
    (activeFilters.minWidth || activeFilters.maxWidth ? 1 : 0) +
    (activeFilters.minHeight || activeFilters.maxHeight ? 1 : 0) +
    (activeFilters.minPrice || activeFilters.maxPrice ? 1 : 0);

  // --- INDIVIDUAL TAG REMOVAL ENGINE TRACKS ---
  const removeChip = (category, value) => {
    setActiveFilters((prev) => {
      if (Array.isArray(prev[category])) {
        return { ...prev, [category]: prev[category].filter((item) => item !== value) };
      }
      return { ...prev, [value]: "" }; // Clears custom input string models
    });
  };

  // --- GLOBAL RESET PIPELINE TRIGGER ---
  const handleClearAll = () => {
    setActiveFilters({
      sort: "newest",
      subjects: [],
      sizes: [],
      priceRange: null,
      orientations: [],
      minWidth: "",
      maxWidth: "",
      minHeight: "",
      maxHeight: "",
      minPrice: "",
      maxPrice: ""
    });
    setSearchTerm("");
  };

  // ... keep your identical filteredPics .filter().sort() block directly here ...
  const filteredPics = pics
    .filter((pic) => {
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        const matchesTitle = pic.alt?.toLowerCase().includes(query);
        const matchesSubject = pic.subject?.toLowerCase().includes(query);
        const dimText = formatDimensionsShort(pic).toLowerCase();
        const matchesSize = dimText.includes(query);
        if (!matchesTitle && !matchesSubject && !matchesSize) return false;
      }
      if (activeFilters.subjects.length > 0 && !activeFilters.subjects.includes(pic.subject)) return false;
      if (activeFilters.sizes.length > 0 && !activeFilters.sizes.includes(getSizeBucket(pic))) return false;
      if (activeFilters.orientations.length > 0 && !activeFilters.orientations.includes(getOrientation(pic))) return false;
      if (activeFilters.priceRange) {
        const price = pic.price;
        if (activeFilters.priceRange === "under500" && price >= 500) return false;
        if (activeFilters.priceRange === "500to1000" && (price < 500 || price > 1000)) return false;
        if (activeFilters.priceRange === "1000to2000" && (price < 1000 || price > 2000)) return false;
        if (activeFilters.priceRange === "2000to5000" && (price < 2000 || price > 5000)) return false;
        if (activeFilters.priceRange === "5000to10000" && (price < 5000 || price > 10000)) return false;
      }
      if (activeFilters.minPrice && pic.price < parseFloat(activeFilters.minPrice)) return false;
      if (activeFilters.maxPrice && pic.price > parseFloat(activeFilters.maxPrice)) return false;
      const { width: itemW, height: itemH } = getDimensions(pic);
      if (activeFilters.minWidth && itemW < parseFloat(activeFilters.minWidth)) return false;
      if (activeFilters.maxWidth && itemW > parseFloat(activeFilters.maxWidth)) return false;
      if (activeFilters.minHeight && itemH < parseFloat(activeFilters.minHeight)) return false;
      if (activeFilters.maxHeight && itemH > parseFloat(activeFilters.maxHeight)) return false;
      return true;
    })
    .sort((a, b) => {
      if (activeFilters.sort === "lowToHigh") return a.price - b.price;
      if (activeFilters.sort === "highToLow") return b.price - a.price;
      if (activeFilters.sort === "newest") return new Date(b.date) - new Date(a.date);
      return 0;
    });

  useEffect(() => {
    setVisibleCount(GALLERY_PAGE_SIZE);
  }, [searchTerm, activeFilters]);

  const visiblePics = filteredPics.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPics.length;
  const remainingCount = filteredPics.length - visibleCount;

  const columnCount = useGalleryColumnCount(showfilters);
  const artworkColumns = distributeIntoColumns(visiblePics, columnCount);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + GALLERY_PAGE_SIZE, filteredPics.length));
  };

useEffect(() => {
  const mediaQuery = window.matchMedia("(max-width: 1254px)");

  const updateScrollLock = () => {
    if (showfilters && mediaQuery.matches) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  updateScrollLock();

  // re-check if the viewport crosses the breakpoint while open (e.g. resize/rotate)
  mediaQuery.addEventListener("change", updateScrollLock);

  return () => {
    mediaQuery.removeEventListener("change", updateScrollLock);
    document.body.style.overflow = "";
  };
}, [showfilters]);
  return (
    <div className="gallery-page-wrapper">
      <h1 className="gallery-main-title">Explore the Gallery</h1>
      <p className="gallery-description">This site serves as a live inventory of my current collection and studio archive.</p>
      <p className="gallery-sub-detail">All paintings are oil on canvas</p>

      {/* --- REWRITTEN HORIZONTAL TOOLBAR RIBBON --- */}
      <div className="gallery-toolbar-ribbon">
        <button className="filterbutton" onClick={() => setshowfilters(!showfilters)}>
          <img src="/seapal/SlidersHorizontal.svg" alt="filter icon" />
          {showfilters ? `HIDE FILTERS ${activeCount > 0 ? `(${activeCount})` : ""}` : "FILTERS"}
        </button>

        {/* Dynamic horizontal scroll chip active fields container track wrapper */}
        <div className="active-chips-track-container">
          {activeCount > 0 && (
            <button className="clear-all-inline-btn" onClick={handleClearAll}>
              CLEAR ALL
            </button>
          )}

          {/* Map array variables out into active UI chips */}
          {activeFilters.subjects.map((sub) => (
            <div key={sub} className="filter-chip">
              {sub} <span className="close-chip-x" onClick={() => removeChip("subjects", sub)}>×</span>
            </div>
          ))}

          {activeFilters.sizes.map((size) => (
            <div key={size} className="filter-chip">
              {size.split(" ")[0]} <span className="close-chip-x" onClick={() => removeChip("sizes", size)}>×</span>
            </div>
          ))}

          {activeFilters.orientations.map((ori) => (
            <div key={ori} className="filter-chip">
              {ori} <span className="close-chip-x" onClick={() => removeChip("orientations", ori)}>×</span>
            </div>
          ))}

          {activeFilters.priceRange && (
            <div className="filter-chip">
              Price Range <span className="close-chip-x" onClick={() => setActiveFilters(prev => ({ ...prev, priceRange: null }))}>×</span>
            </div>
          )}

          {(activeFilters.minWidth || activeFilters.maxWidth) && (
            <div className="filter-chip">
              Custom Width <span className="close-chip-x" onClick={() => setActiveFilters(prev => ({ ...prev, minWidth: "", maxWidth: "" }))}>×</span>
            </div>
          )}

          {(activeFilters.minHeight || activeFilters.maxHeight) && (
            <div className="filter-chip">
              Custom Height <span className="close-chip-x" onClick={() => setActiveFilters(prev => ({ ...prev, minHeight: "", maxHeight: "" }))}>×</span>
            </div>
          )}
        </div>

        <div className="search-bar-mock">
          <span className="search-icon"><img src="/seapal/search.svg" alt="search" /></span>
          <input 
            type="text" 
            placeholder="Search" 
            className="search-input" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {showfilters && <div className="filter-overlay"></div>}

      <div className={`gallery-split-layout ${showfilters ? "filters-shown" : "filters-hidden"}`}>
        {renderSidebar && (
          <div className="sidebar-track">
            <Filter resultCount={filteredPics.length} handleClearAll = {handleClearAll}
            showfilters={showfilters} setshowfilters={setshowfilters} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
          </div>
        )}

        <div className="gallery-artwork-section">
          <div className="artwork-grid">
            {filteredPics.length === 0 ? (
              <p className="no-results">No matching artworks found.</p>
            ) : (
              artworkColumns.map((column, colIndex) => (
                <div key={colIndex} className="artwork-column">
                  {column.map((pic) => (
                    <Artwork key={pic.id} {...pic} />
                  ))}
                </div>
              ))
            )}
          </div>

          {hasMore && (
            <button type="button" className="load-more-btn" onClick={loadMore}>
              Load more ({remainingCount} remaining)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
