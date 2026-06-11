import { useState } from "react";
import "./filtersidebar.css";

export default function Filter() {
  const [openSection, setOpenSection] = useState(null);
  const [showmore, setshowmore] = useState(false);
  
  // Independent open/close toggles for custom fields
  const [customSizeOpen, setCustomSizeOpen] = useState(false);
  const [customPriceOpen, setCustomPriceOpen] = useState(false);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
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
              <input type="radio" name="sort" />
              Date listed: New to Old
            </label>
            <label>
              <input type="radio" name="sort" />
              Price: Low to High
            </label>
            <label>
              <input type="radio" name="sort" />
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
              <input type="checkbox" name="subject" />
              Animal
            </label>
            <label>
              <input type="checkbox" name="subject" />
              Landscape
            </label>

            {showmore ? (
              <>
                <label>
                  <input type="checkbox" name="subject" />
                  Abstract
                </label>
                <label>
                  <input type="checkbox" name="subject" />
                  Nature
                </label>
                <label>
                  <input type="checkbox" name="subject" />
                  Floral
                </label>
                <label>
                  <input type="checkbox" name="subject" />
                  Beach
                </label>
                <label>
                  <input type="checkbox" name="subject" />
                  Politics
                </label>
                <label>
                  <input type="checkbox" name="subject" />
                  Seascape
                </label>
                <label>
                  <input type="checkbox" name="subject" />
                  Water
                </label>
                <label>
                  <input type="checkbox" name="subject" />
                  Still Life
                </label>
                <label>
                  <input type="checkbox" name="subject" />
                  Calligraphy
                </label>
                <label>
                  <input type="checkbox" name="subject" />
                  Food & Drink
                </label>
                <label>
                  <input type="checkbox" name="subject" />
                  Graffiti
                </label>
                <label>
                  <input type="checkbox" name="subject" />
                  Language
                </label>
                <label>
                  <input type="checkbox" name="subject" />
                  Music
                </label>
                <label>
                  <input type="checkbox" name="subject" />
                  Pop Culture/Celebrity
                </label>
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
              <input type="checkbox" name="size" />
              Small (&lt;50 cm)
            </label>
            <label>
              <input type="checkbox" name="size" />
              Medium (50 - 100 cm)
            </label>
            <label>
              <input type="checkbox" name="size" />
              Large (100 - 150 cm)
            </label>
            <label>
              <input type="checkbox" name="size" />
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
                      <input type="text" placeholder="Min" className="custom-input" />
                      <span className="dash-separator">—</span>
                      <input type="text" placeholder="Max" className="custom-input" />
                    </div>
                  </div>
                  <button className="ok-btn">OK</button>
                </div>

                <div className="custom-size-row" style={{ marginTop: "12px" }}>
                  <div className="custom-size-block">
                    <span className="custom-size-label">Height (cm)</span>
                    <div className="input-with-separator">
                      <input type="text" placeholder="Min" className="custom-input" />
                      <span className="dash-separator">—</span>
                      <input type="text" placeholder="Max" className="custom-input" />
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
                      <input type="text" placeholder="$ Min" className="custom-input" />
                      <span className="dash-separator">—</span>
                      <input type="text" placeholder="$ Max" className="custom-input" />
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
