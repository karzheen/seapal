import { useState } from "react";
import "./filtersidebar.css";
export default function Filter() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  const [showmore, setshowmore] = useState(false);
  return (
    <div className="filtersidebar">
      {/* MAIN ITEM 1 */}
      <div className="line-topbuttom">
        <button onClick={() => toggleSection("sort")} className="listcolumn">
          SORT
          <img
            className="chevron"
            src={
              openSection == "sort"
                ? "/src/img/chevron-up.svg"
                : "/src/img/chevron-down.svg"
            }
            alt="dropdown"
          />
        </button>
        {openSection === "sort" && (
          <div className="dropdown">
            /*the div inside the div is wrong fix that*/
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
      <div className="line-under">
        {" "}
        <button onClick={() => toggleSection("subject")} className="listcolumn">
          SUBJECT
          <img
            className="chevron"
            src={
              openSection == "subject"
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
              <div className="dropdown">
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
                <button onClick={() => setshowmore(!showmore)}>
                  SHOW LESS
                </button>
              </div>
            ) : (
              <button onClick={() => setshowmore(!showmore)}>SHOW MORE</button>
            )}
          </div>
        )}
      </div>
      <div className="line-under">
        {" "}
        <button onClick={() => toggleSection("size")} className="listcolumn">
          SIZE
          <img
            className="chevron"
            src={
              openSection == "size"
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
              Small({"<"}50 cm)
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
              Oversized ({">"}150 cm)
            </label>
          </div>
        )}
      </div>
      <div className="line-under">
        <button onClick={() => toggleSection("price")} className="listcolumn">
          PRICE
          <img
            className="chevron"
            src={
              openSection == "price"
                ? "/src/img/chevron-up.svg"
                : "/src/img/chevron-down.svg"
            }
            alt="dropdown"
          />
        </button>
        {openSection === "price" && (
          <div className="dropdown">Price options...</div>
        )}
      </div>
      <div className="line-under">
        <button
          onClick={() => toggleSection("orientation")}
          className="listcolumn"
        >
          ORIENTATION
          <img
            className="chevron"
            src={
              openSection == "orientation"
                ? "/src/img/chevron-up.svg"
                : "/src/img/chevron-down.svg"
            }
            alt="dropdown"
          />
          {openSection === "orientation" && (
            <div className="dropdown">Orientation options...</div>
          )}
        </button>
      </div>
    </div>
  );
}
/* we don't need a button for the menu*/
