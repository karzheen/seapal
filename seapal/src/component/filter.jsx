import { useState } from "react";
import "./filtersidebar.css";

export default function Filter({ activeFilters, setActiveFilters }) {
  const [openSection, setOpenSection] = useState(null);
  const [showmore, setshowmore] = useState(false);

  // Independent open/close toggles for custom fields
  const [customSizeOpen, setCustomSizeOpen] = useState(false);
  const [customPriceOpen, setCustomPriceOpen] = useState(false);

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
                ? "/src/img/chevron-up.svg"
                : "/src/img/chevron-down.svg"
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
                ? "/src/img/chevron-up.svg"
                : "/src/img/chevron-down.svg"
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
                ? "/src/img/chevron-up.svg"
                : "/src/img/chevron-down.svg"
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
                onChange={() =>
                  handleCheckboxChange("sizes", "Medium (50 - 100 cm)")
                }
              />
              Medium (50 - 100 cm)
            </label>
            <label>
              <input
                type="checkbox"
                checked={activeFilters.sizes.includes("Large (100 - 150 cm)")}
                onChange={() =>
                  handleCheckboxChange("sizes", "Large (100 - 150 cm)")
                }
              />
              Large (100 - 150 cm)
            </label>
            <label>
              <input
                type="checkbox"
                checked={activeFilters.sizes.includes("Oversized (>150 cm)")}
                onChange={() =>
                  handleCheckboxChange("sizes", "Oversized (>150 cm)")
                }
              />
              Oversized (&gt;150 cm)
            </label>

            <button
              onClick={() => setCustomSizeOpen(!customSizeOpen)}
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
                        type="text"
                        placeholder="Min"
                        className="custom-input"
                      />
                      <span className="dash-separator">—</span>
                      <input
                        type="text"
                        placeholder="Max"
                        className="custom-input"
                      />
                    </div>
                  </div>
                  <button className="ok-btn">OK</button>
                </div>

                <div className="custom-size-row" style={{ marginTop: "12px" }}>
                  <div className="custom-size-block">
                    <span className="custom-size-label">Height (cm)</span>
                    <div className="input-with-separator">
                      <input
                        type="text"
                        placeholder="Min"
                        className="custom-input"
                      />
                      <span className="dash-separator">—</span>
                      <input
                        type="text"
                        placeholder="Max"
                        className="custom-input"
                      />
                    </div>
                  </div>
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
              <input type="radio" name="price" />
              Under $500
            </label>
            <label>
              <input type="radio" name="price" />
              $500 - $1,000
            </label>
            <label>
              <input type="radio" name="price" />
              $1,000 - $2,000
            </label>
            <label>
              <input type="radio" name="price" />
              $2,000 - $5,000
            </label>
            <label>
              <input type="radio" name="price" />
              $5,000 - $10,000
            </label>

            <button
              onClick={() => setCustomPriceOpen(!customPriceOpen)}
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
                        type="text"
                        placeholder="$ Min"
                        className="custom-input"
                      />
                      <span className="dash-separator">—</span>
                      <input
                        type="text"
                        placeholder="$ Max"
                        className="custom-input"
                      />
                    </div>
                  </div>
                  <button className="ok-btn">OK</button>
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
