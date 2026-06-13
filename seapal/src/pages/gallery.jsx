import Filter from "../component/filter";
import "./gallery.css";
import pics from "../data/picData";
import { useState } from "react";
import Artwork from "../component/artwork";

export default function Gallery() {
  const [showfilters, setshowfilters] = useState(false);

  // Centralized filter selection state data models
  const [activeFilters, setActiveFilters] = useState({
    sort: "newest",
    subjects: [],
    sizes: [],
    priceRange: null,
    orientations: [],
  });

  // Dynamic live calculation filtering engine pipelines
  const filteredPics = pics
    .filter((pic) => {
      if (activeFilters.subjects.length > 0) {
        if (!activeFilters.subjects.includes(pic.subject)) return false;
      }

      if (activeFilters.sizes.length > 0) {
        if (!activeFilters.sizes.includes(pic.size)) return false;
      }

      if (activeFilters.orientations.length > 0) {
        if (!activeFilters.orientations.includes(pic.orientation)) return false;
      }

      if (activeFilters.priceRange) {
        const price = pic.price;
        if (activeFilters.priceRange === "under500" && price >= 500)
          return false;
        if (
          activeFilters.priceRange === "500to1000" &&
          (price < 500 || price > 1000)
        )
          return false;
        if (
          activeFilters.priceRange === "1000to2000" &&
          (price < 1000 || price > 2000)
        )
          return false;
        if (
          activeFilters.priceRange === "2000to5000" &&
          (price < 2000 || price > 5000)
        )
          return false;
        if (
          activeFilters.priceRange === "5000to10000" &&
          (price < 5000 || price > 10000)
        )
          return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (activeFilters.sort === "lowToHigh") return a.price - b.price;
      if (activeFilters.sort === "highToLow") return b.price - a.price;
      if (activeFilters.sort === "newest")
        return new Date(b.date) - new Date(a.date);
      return 0;
    });

  return (
    <div className="gallery-page-wrapper">
      {/* 1. TOP HEADER TITLES (Matching your mockup text style) */}
      <h1 className="gallery-main-title">Lorem ipsum</h1>
      <p className="gallery-description">
        This site serves as a live inventory of my current collection and studio
        archive.
      </p>
      <p className="gallery-sub-detail">All paintings are oil on canvas</p>

      {/* 2. HORIZONTAL TOOLBAR RIBBON (Button and Search sit directly above the grid) */}
      <div className="gallery-toolbar-ribbon">
        <button
          className="filterbutton"
          onClick={() => setshowfilters(!showfilters)}
        >
          <img src="src/img/SlidersHorizontal.svg" alt="filter icon" />
          {showfilters ? "HIDE FILTERS" : "FILTERS"}
        </button>

        {/* Dummy placeholder matching your screenshot input */}
        <div className="search-bar-mock">
          <span className="search-icon">
            <img src="src/img/search.svg" />
          </span>
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </div>

      {/* 3. TWO COLUMN MAIN SCREEN SPLIT CONTENT VIEW */}
      <div
        className={`gallery-split-layout ${showfilters ? "filters-shown" : "filters-hidden"}`}
      >
        {/* Left Side: Accordion Lists (Only takes up space if visible/shown) */}
        {showfilters && (
          <div className="sidebar-track">
            <Filter
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
          </div>
        )}

        {/* Right Side: Visual Artwork Cards Matrix */}
        <div className="artwork-grid">
          {filteredPics.map((pic) => (
            <Artwork key={pic.id} {...pic} />
          ))}
          {filteredPics.length === 0 && (
            <p className="no-results">No matching artworks found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
