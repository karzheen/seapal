import "./home.css";

export default function About() {
  return (
    <div className="home-page-wrapper-main">
      <section className="behind-canvas-section">
        <span className="anatomytitle">
          <img src="/seapal/behind.svg" alt="Behind the canvas illustration board overview asset" />
        </span>
        <div className="behind-canvas-content">
          <span>
            <div>Seapal Nadhim</div>
            <p>
              I am a painter based in Erbil. My practice is centered on the intersection of the maritime environment, botanical studies, and the self-portrait. I work primarily in heavy oils on raw linen, documenting the physical transitions of the sea and the garden. This site serves as a live inventory of my current collection and studio archive.
            </p>
          </span>
          <img src="/seapal/seapalbehindcanvas.svg" alt="Behind Canvas Illustration" />
        </div>
      </section>
    </div>
  );
}
