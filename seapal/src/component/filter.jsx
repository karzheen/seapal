import { useState } from "react";
import "./filtersidebar.css";

export default function Filter({ activeFilters, setActiveFilters }) {
  const [openSection, setOpenSection] = useState(null);
  const [showmore, setshowmore] = useState(false);

  // Independent open/close toggles for custom fields
  const [customSizeOpen, setCustomSizeOpen] = useState(false);
  const [customPriceOpen, setCustomPriceOpen] = useState(false);
const [localMinPrice, setLocalMinPrice] = useState(activeFilters.minPrice || "");
const [localMaxPrice, setLocalMaxPrice] = useState(activeFilters.maxPrice || "");

  // FIX: Added the missing state definitions so the component doesn't crash
  const [localWidthMin, setLocalWidthMin] = useState(activeFilters.minWidth || "");
  const [localWidthMax, setLocalWidthMax] = useState(activeFilters.maxWidth || "");
  const [localHeightMin, setLocalHeightMin] = useState(activeFilters.minHeight || "");
  const [localHeightMax, setLocalHeightMax] = useState(activeFilters.maxHeight || "");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Radio button change trigger handler (Sort & Price choices)
  const handleRadioChange = (filterKey, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  // Multi-select checkbox toggle helper (Subjects, Sizes, Orientations)
  const handleCheckboxChange = (filterKey, value) => {
    setActiveFilters((prev) => {
      const currentList = prev[filterKey];
      const isAlreadyChecked = currentList.includes(value);

      const updatedList = isAlreadyChecked
        ? currentList.filter((item) => item !== value)
        : [...currentList, value];

      return {
        ...prev,
        [filterKey]: updatedList,
      };
    });
  };

  return (
    <div className="filtersidebar">
      {/* MAIN ITEM 1 - SORT */}
      <div className="line-topbuttom">
        <button onClick={() => toggleSection("sort")} className="listcolumn">
          SORT
          <img
            className="chevron"
            src={
              openSection === "sort"
                ? "/seapal/chevron-up.svg"
                : "/seapal/chevron-down.svg"
            }
            alt="dropdown"
          />
        </button>
        {openSection === "sort" && (
          <div className="dropdown">
            <label>
              <input
                type="radio"
                name="sort"
                checked={activeFilters.sort === "newest"}
                onChange={() => handleRadioChange("sort", "newest")}
              />
              Date listed: New to Old
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                checked={activeFilters.sort === "lowToHigh"}
                onChange={() => handleRadioChange("sort", "lowToHigh")}
              />
              Price: Low to High
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                checked={activeFilters.sort === "highToLow"}
                onChange={() => handleRadioChange("sort", "highToLow")}
              />
              Price: High to Low
            </label>
          </div>
        )}
      </div>

      {/* MAIN ITEM 2 - SUBJECT */}
      <div className="line-under">
        <button onClick={() => toggleSection("subject")} className="listcolumn">
          SUBJECT
          <img
            className="chevron"
            src={
              openSection === "subject"
                ? "/seapal/chevron-up.svg"
                : "/seapal/chevron-down.svg"
            }
            alt="dropdown"
          />
        </button>
        {openSection === "subject" && (
          <div className="dropdown">
            <label>
              <input
                type="checkbox"
                checked={activeFilters.subjects.includes("Animal")}
                onChange={() => handleCheckboxChange("subjects", "Animal")}
              />
              Animal
            </label>
            <label>
              <input
                type="checkbox"
                checked={activeFilters.subjects.includes("Landscape")}
                onChange={() => handleCheckboxChange("subjects", "Landscape")}
              />
              Landscape
            </label>

            {showmore ? (
              <>
                {[
                  "Abstract",
                  "Nature",
                  "Floral",
                  "Beach",
                  "Politics",
                  "Seascape",
                  "Water",
                  "Still Life",
                  "Calligraphy",
                  "Food & Drink",
                  "Graffiti",
                  "Language",
                  "Music",
                  "Pop Culture/Celebrity",
                ].map((sub) => (
                  <label key={sub}>
                    <input
                      type="checkbox"
                      checked={activeFilters.subjects.includes(sub)}
                      onChange={() => handleCheckboxChange("subjects", sub)}
                    />
                    {sub}
                  </label>
                ))}
                <button
                  onClick={() => setshowmore(!showmore)}
                  className="show-more-btn"
                >
                  SHOW LESS
                </button>
              </>
            ) : (
              <button
                onClick={() => setshowmore(!showmore)}
                className="show-more-btn"
              >
                SHOW MORE
              </button>
            )}
          </div>
        )}
      </div>

      {/* MAIN ITEM 3 - SIZE */}
      <div className="line-under">
        <button onClick={() => toggleSection("size")} className="listcolumn">
          SIZE
          <img
            className="chevron"
            src={
              openSection === "size"
                ? "/seapal/chevron-up.svg"
                : "/seapal/chevron-down.svg"
            }
            alt="dropdown"
          />
        </button>
        {openSection === "size" && (
          <div className="dropdown">
            <label>
              <input
                type="checkbox"
                checked={activeFilters.sizes.includes("Small (<50 cm)")}
                onChange={() => handleCheckboxChange("sizes", "Small (<50 cm)")}
              />
              Small (&lt;50 cm)
            </label>
            <label>
              <input
                type="checkbox"
                checked={activeFilters.sizes.includes("Medium (50 - 100 cm)")}
                onChange={() => handleCheckboxChange("sizes", "Medium (50 - 100 cm)")}
              />
              Medium (50 - 100 cm)
            </label>
            <label>
              <input
                type="checkbox"
                checked={activeFilters.sizes.includes("Large (100 - 150 cm)")}
                onChange={() => handleCheckboxChange("sizes", "Large (100 - 150 cm)")}
              />
              Large (100 - 150 cm)
            </label>
            <label>
              <input
                type="checkbox"
                checked={activeFilters.sizes.includes("Oversized (>150 cm)")}
                onChange={() => handleCheckboxChange("sizes", "Oversized (>150 cm)")}
              />
              Oversized (&gt;150 cm)
            </label>

            <button
              onClick={() => {
                if (customSizeOpen) {
                  setLocalWidthMin("");
                  setLocalWidthMax("");
                  setLocalHeightMin("");
                  setLocalHeightMax("");
                  setActiveFilters((prev) => ({
                    ...prev,
                    minWidth: "",
                    maxWidth: "",
                    minHeight: "",
                    maxHeight: "",
                  }));
                }
                setCustomSizeOpen(!customSizeOpen);
              }}
              className="show-more-btn"
              style={{ marginTop: "12px", marginBottom: "8px" }}
            >
              {customSizeOpen ? "REMOVE CUSTOM SIZE" : "SELECT CUSTOM SIZE"}
            </button>

            {customSizeOpen && (
              <div className="custom-size-container">
                <div className="custom-size-row">
                  <div className="custom-size-block">
                    <span className="custom-size-label">Width (cm)</span>
                    <div className="input-with-separator">
                      <input
                        type="number"
                        placeholder="Min"
                        className="custom-input"
                        value={localWidthMin}
                        onChange={(e) => setLocalWidthMin(e.target.value)}
                      />
                      <span className="dash-separator">—</span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="custom-input"
                        value={localWidthMax}
                        onChange={(e) => setLocalWidthMax(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    className="ok-btn"
                    onClick={() => {
                      setActiveFilters((prev) => ({
                        ...prev,
                        minWidth: localWidthMin,
                        maxWidth: localWidthMax,
                        minHeight: localHeightMin,
                        maxHeight: localHeightMax,
                      }));
                    }}
                  >
                    OK
                  </button>
                </div>

                <div className="custom-size-row" style={{ marginTop: "12px" }}>
                  <div className="custom-size-block">
                    <span className="custom-size-label">Height (cm)</span>
                    <div className="input-with-separator">
                <input
                  type="number"
                  placeholder="Min"
                  className="custom-input"
                  value={localHeightMin}
                  onChange={(e) => setLocalHeightMin(e.target.value)}
                />
                <span className="dash-separator">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="custom-input"
                  value={localHeightMax}
                  onChange={(e) => setLocalHeightMax(e.target.value)}
                />
              </div>
            </div>
            {/* Separator block matching structural alignment metrics */}
            <div style={{ width: "45px" }}></div>
          </div>
        </div>
      )}
    </div>
  )}
</div>

    {/* MAIN ITEM 4 - PRICE */}
<div className="line-under">
  <button onClick={() => toggleSection("price")} className="listcolumn">
    PRICE
    <img
      className="chevron"
      src={
        openSection === "price"
          ? "/src/img/chevron-up.svg"
          : "/src/img/chevron-down.svg"
      }
      alt="dropdown"
    />
  </button>
  {openSection === "price" && (
    <div className="dropdown">
      <label>
        <input 
          type="radio" 
          name="price" 
          checked={activeFilters.priceRange === "under500"}
          onChange={() => {
            // Clears custom prices if a preset category is clicked
            setLocalMinPrice("");
            setLocalMaxPrice("");
            setActiveFilters(prev => ({ ...prev, priceRange: "under500", minPrice: "", maxPrice: "" }));
          }}
        />
        Under $500
      </label>
      <label>
        <input 
          type="radio" 
          name="price" 
          checked={activeFilters.priceRange === "500to1000"}
          onChange={() => {
            setLocalMinPrice("");
            setLocalMaxPrice("");
            setActiveFilters(prev => ({ ...prev, priceRange: "500to1000", minPrice: "", maxPrice: "" }));
          }}
        />
        $500 - $1,000
      </label>
      <label>
        <input 
          type="radio" 
          name="price" 
          checked={activeFilters.priceRange === "1000to2000"}
          onChange={() => {
            setLocalMinPrice("");
            setLocalMaxPrice("");
            setActiveFilters(prev => ({ ...prev, priceRange: "1000to2000", minPrice: "", maxPrice: "" }));
          }}
        />
        $1,000 - $2,000
      </label>
      <label>
        <input 
          type="radio" 
          name="price" 
          checked={activeFilters.priceRange === "2000to5000"}
          onChange={() => {
            setLocalMinPrice("");
            setLocalMaxPrice("");
            setActiveFilters(prev => ({ ...prev, priceRange: "2000to5000", minPrice: "", maxPrice: "" }));
          }}
        />
        $2,000 - $5,000
      </label>
      <label>
        <input 
          type="radio" 
          name="price" 
          checked={activeFilters.priceRange === "5000to10000"}
          onChange={() => {
            setLocalMinPrice("");
            setLocalMaxPrice("");
            setActiveFilters(prev => ({ ...prev, priceRange: "5000to10000", minPrice: "", maxPrice: "" }));
          }}
        />
        $5,000 - $10,000
      </label>

      <button
        onClick={() => {
          if (customPriceOpen) {
            // Reset local states and global states on click to clear out hidden calculations
            setLocalMinPrice("");
            setLocalMaxPrice("");
            setActiveFilters((prev) => ({
              ...prev,
              minPrice: "",
              maxPrice: "",
            }));
          }
          setCustomPriceOpen(!customPriceOpen);
        }}
        className="show-more-btn"
        style={{ marginTop: "12px", marginBottom: "8px" }}
      >
        {customPriceOpen ? "REMOVE CUSTOM PRICE" : "SELECT CUSTOM PRICE"}
      </button>

      {customPriceOpen && (
        <div className="custom-size-container">
          <div className="custom-size-row">
            <div className="custom-size-block">
              <span className="custom-size-label">Price</span>
              <div className="input-with-separator">
                <input
                  type="number"
                  placeholder="$ Min"
                  className="custom-input"
                  value={localMinPrice}
                  onChange={(e) => setLocalMinPrice(e.target.value)}
                />
                <span className="dash-separator">—</span>
                <input
                  type="number"
                  placeholder="$ Max"
                  className="custom-input"
                  value={localMaxPrice}
                  onChange={(e) => setLocalMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <button 
              className="ok-btn"
              onClick={() => {
                setActiveFilters((prev) => ({
                  ...prev,
                  priceRange: null, // Clear preset radios when applying custom prices
                  minPrice: localMinPrice,
                  maxPrice: localMaxPrice,
                }));
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )}
</div>


      {/* MAIN ITEM 5 - ORIENTATION */}
      <div className="line-under">
        <button
          onClick={() => toggleSection("orientation")}
          className="listcolumn"
        >
          ORIENTATION
          <img
            className="chevron"
            src={
              openSection === "orientation"
                ? "/src/img/chevron-up.svg"
                : "/src/img/chevron-down.svg"
            }
            alt="dropdown"
          />
        </button>
        {openSection === "orientation" && (
          <div className="dropdown">
            <label>
              <input type="checkbox" name="orientation" />
              Horizontal
            </label>
            <label>
              <input type="checkbox" name="orientation" />
              Vertical
            </label>
            <label>
              <input type="checkbox" name="orientation" />
              Square
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
