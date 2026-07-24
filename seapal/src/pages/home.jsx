import "./home.css";
import pics from "../data/picData";
import Picture from "../component/pictures";
import Artwork from "../component/artwork";
import Reveal from "../component/reveal";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Home() {
  const navigate = useNavigate();

  // one shuffled delay per hero picture — CHANGE THE GAPS HERE to control spacing
  const heroDelays = useMemo(
    () => shuffle([0, 150, 300, 450, 600, 750, 900]),
    []
  );

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
        <Reveal variant="fade-up" delay={heroDelays[0]}>
          <section onClick={() => navigate(`/detail/${picsarr[0].key}`)} className="pic1">
            {picsarr[0]}
          </section>
        </Reveal>

        <Reveal variant="fade-up" delay={heroDelays[1]}>
          <section onClick={() => navigate(`/detail/${picsarr[1].key}`)} className="pic2">
            {picsarr[1]}
          </section>
        </Reveal>

        {/* THE SAND COLLECTION CONTENT MODULE CARD */}
        <Reveal variant="fade-up" delay={120}>
          <section className="collectionsec">
            <div className="heading-row">
              <div className="the">THE</div>
              <div className="year">SAND</div>
            </div>
            <div className="collection">COLLECTION</div>
            <button className="see-all-btn" onClick={() => navigate('/gallery')}>
              See all
            </button>
          </section>
        </Reveal>

        <button className="see-all-btn-mobile" onClick={() => navigate('/gallery')}>
          See all
        </button>

        <Reveal variant="fade-up" delay={heroDelays[2]}>
          <section onClick={() => navigate(`/detail/${picsarr[2].key}`)} className="pic3">
            {picsarr[2]}
          </section>
        </Reveal>

        <Reveal variant="fade-up" delay={heroDelays[3]}>
          <section onClick={() => navigate(`/detail/${picsarr[4].key}`)} className="pic4">
            {picsarr[4]}
          </section>
        </Reveal>

        <Reveal variant="fade-up" delay={heroDelays[4]}>
          <section onClick={() => navigate(`/detail/${picsarr[3].key}`)} className="pic5">
            {picsarr[3]}
          </section>
        </Reveal>

        <Reveal variant="fade-up" delay={heroDelays[5]}>
          <section onClick={() => navigate(`/detail/${picsarr[5].key}`)} className="pic6">
            {picsarr[5]}
          </section>
        </Reveal>

        <Reveal variant="fade-up" delay={heroDelays[6]}>
          <section onClick={() => navigate(`/detail/${picsarr[6].key}`)} className="pic7">
            {picsarr[6]}
          </section>
        </Reveal>

        {/* THE FREUD POETRY BANNER LAYER */}
        <Reveal variant="fade-left" delay={0}>
          <section className="qoute">
            <div className="qoute-content">
              <div className="qoute-text">
                <p className="qoutesub">
                  "The longer you look at an object, the more abstract it becomes, and, ironically, the more real."
                </p>
                <p className="name">— Lucian Freud</p>
              </div>
              <img className="quote-flower-mobile" src="/seapal/flower.svg" alt="" />
            </div>
          </section>
        </Reveal>
      </div>

      {/* 3. THE ANATOMY OF THE STROKE SECTION BLOCK */}
      <div className="anatomy">
        <Reveal variant="scale" delay={0}>
          <section className="anatomytitle">
            <img src="/seapal/The Anatomy of The Stroke.svg" alt="The Anatomy of The Stroke Title" />
          </section>
        </Reveal>

        <div className="anatomycontent">
          <Reveal variant="fade-up" delay={0}>
            <section className="anatomy-upperpart">
              <div className="anatomy-main-headings">
                <div className="anatomy-main-heading">BONE</div>
                <div className="anatomy-main-heading">TIDES</div>
                <div className="anatomy-main-heading">COLOR</div>
                <div className="poetic-text">
                  I translate the weight of the ocean and the fragility of the
                  flower into the language of the human face.
                </div>
              </div>
              <img className="seapal-painting" src="/seapal/Seapal-painting.webp" alt="yellow sweep stroke asset" />
            </section>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={0}>
          <img className="horse-painting" src="/seapal/Horses.webp" alt="horse illustration" />
        </Reveal>
      </div>

      {/* 4. BEHIND THE CANVAS FOOTER CARDS BANNER */}
      <Reveal variant="fade-up" delay={0}>
        <section className="behind-canvas-section">
          <span className="anatomytitle">
            <img src="/seapal/behind.svg" alt="Behind the canvas illustration board overview asset" />
          </span>
          <div className="behind-canvas-content">
            <span>
              <div>Seapal Nadhim  </div>
              <p>I am a painter based in Erbil. My practice is centered on the intersection of the maritime environment, botanical studies, and the self-portrait. I work primarily in heavy oils on raw linen, documenting the physical transitions of the sea and the garden. This site serves as a live inventory of my current collection and studio archive.</p>
            </span>
            <img className="behind-canvas-illustration" src="/seapal/seapal-photo.webp" alt="Behind Canvas Illustration" />
          </div>
        </section>
      </Reveal>

      {/* 5. GALLERY SECTION */}
      <section className="gallery-section">
        <Reveal variant="scale" delay={0}>
          <span className="gallerytitle">
            <img src="/seapal/Gallery.svg" alt="Behind the canvas illustration board overview asset" />
          </span>
        </Reveal>

        <div className="gallery-grid">
          {pics.slice(0, 4).map((pic, index) => (
            <Reveal key={pic.id} variant="fade-up" delay={index * 100}>
              <Artwork {...pic} />
            </Reveal>
          ))}
        </div>

        <button className="gallery-see-more-btn" onClick={() => navigate('/gallery')}>
          See More
        </button>
      </section>
    </div>
  );
}