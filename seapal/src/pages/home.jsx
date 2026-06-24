import "./home.css";
import pics from "../data/picData";
import Picture from "../component/pictures";
import Artwork from "../component/artwork";
// 1. Import the routing hook at the very top of your file
import { useNavigate } from "react-router-dom";

export default function Home() {
  // 2. Initialize the navigation hook inside your component body
  const navigate = useNavigate();

  const picsarr = pics.map((pic) => (
    <Picture
      key={pic.id}
      src={pic.src}
      alt={pic.alt}
      padding={pic.padding}
      width={pic.width}
      height={pic.height}
    />
  ));

  return (
    <div className="home-page-wrapper-main">
      {/* 2. THE ASYMMETRIC MASONRY GRID HERO BOARD */}
      <div className="home">
        <section className="pic1">{picsarr[0]}</section>
        <section className="pic2">{picsarr[1]}</section>
        
        {/* THE SAND COLLECTION CONTENT MODULE CARD */}
        <section className="collectionsec">
          <div className="the">THE</div>
          <div className="year">SAND</div>
          <div className="collection">COLLECTION</div>
          {/* Fixed: Bypasses window.location reload to preserve subfolder context */}
          <button className="see-all-btn" onClick={() => navigate('/gallery')}>
            See all
          </button>
        </section>

        <section className="pic3">{picsarr[2]}</section>
        <section className="pic4">{picsarr[4]}</section>
        <section className="pic5">{picsarr[3]}</section>
        <section className="pic6">{picsarr[5]}</section>
        <section className="pic7">{picsarr[6]}</section>
        
        {/* THE FREUD POETRY BANNER LAYER */}
        <section className="qoute">
          <p className="qoutesub">
            "The longer you look at an object, the more abstract it becomes, and, ironically, the more real."
          </p>
          <p className="name">— Lucian Freud</p> 
        </section>
      </div>

      {/* 3. THE ANATOMY OF THE STROKE SECTION BLOCK */}
      <div className="anatomy">
        <section className="anatomytitle">
          <img src="/seapal/The Anatomy of The Stroke.svg" alt="The Anatomy of The Stroke Title" />
        </section>
        
        <div className="anatomycontent">
          <section className="anatomy-upperpart">
            <div>
              <div className="anatomy-main-heading">BONE</div>
              <div className="anatomy-main-heading">TIDES</div>
              <div className="anatomy-main-heading">COLOR</div>
              <div className="poetic-text">
                I translate the weight of the ocean and the fragility of the
                flower into the language of the human face.
              </div>
            </div>
            <img src="/seapal/yellow.svg" alt="yellow sweep stroke asset"  />
          </section>
          
        </div>
        <img src="/seapal/Horse.svg" alt="horse illustration"  />
      </div>

      {/* 4. BEHIND THE CANVAS FOOTER CARDS BANNER */}
      <section className="behind-canvas-section">
        <span className="anatomytitle">        
          <img src="/seapal/behind.svg" alt="Behind the canvas illustration board overview asset" />
        </span>
        <div className="behind-canvas-content">
          <span>
            <div>Seapal Nadhim  </div>
            <p>I am a painter based in Erbil. My practice is centered on the intersection of the maritime environment, botanical studies, and the self-portrait. I work primarily in heavy oils on raw linen, documenting the physical transitions of the sea and the garden. This site serves as a live inventory of my current collection and studio archive.</p>
          </span>
          <img src="/seapal/seapalbehindcanvas.svg" alt="Behind Canvas Illustration" />
        </div>
      </section>

      {/* 5. GALLERY SECTION */}
      <section className="gallery-section">
        <span className="gallerytitle">        
          <img src="/seapal/Gallery.svg" alt="Behind the canvas illustration board overview asset" />
        </span>

        <div className="gallery-grid">
          {/* .slice(0, 4) ensures only the first 4 elements are rendered */}
          {pics.slice(0, 4).map((pic) => <Artwork key={pic.id} {...pic} />)}
        </div>
        {/* Fixed: Bypasses window.location reload to preserve subfolder context */}
        <button className="gallery-see-more-btn" onClick={() => navigate('/gallery')}>
          See More
        </button>
      </section>
    </div>
  );
}
