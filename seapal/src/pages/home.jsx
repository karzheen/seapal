import "./home.css";
import pics from "../data/picData";
import Picture from "../component/pictures";
export default function Home() {
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
          <button className="see-all-btn" onClick={() => window.location.href='/gallery'}>
            See all
          </button>
        </section>

        <section className="pic3">{picsarr[2]}</section>
        <section className="pic5">{picsarr[4]}</section>
        <section className="pic4">{picsarr[3]}</section>
        <section className="pic7">{picsarr[6]}</section>
        <section className="pic6">{picsarr[5]}</section>
        
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
    <img src="/src/img/The Anatomy of The Stroke.svg" alt="The Anatomy of The Stroke Title" />
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
      
      
      <img src="/src/img/yellow.svg" alt="yellow sweep stroke asset"  />
    </section>

    <img src="/src/img/horse.svg" alt="horse illustration"  />
  </div>
</div>


      {/* 4. BEHIND THE CANVAS FOOTER CARDS BANNER */}
      <div className="behind-canvas-section">
        <img src="src/img/behind.svg" alt="Behind the canvas illustration board overview asset" />
      </div>
    </div>
  );
}
