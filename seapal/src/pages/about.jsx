import { useState } from "react";
import "./about.css";
import ContactPopup from "../component/contactPopup";

export default function About() {
  const [showContactPopup, setShowContactPopup] = useState(false);

  return (
    <div className="about-page-wrapper">
      <div className="about-intro">
        <div className="about-intro-text">
          <p className="about-eyebrow">Movement, Depth and Emotion</p>
          <h1 className="about-heading">Get to know me</h1>

          <p className="about-quote">
            "ArtDelaSea is more than a collection of artworks; it is an
            invitation into a world where nature, emotion, and freedom exist
            as one."
          </p>

          <p className="about-bio-paragraph">
            ArtDelaSea is my artistic expression, inspired by the enduring connection between humans and horses. their spirit, elegance, and untamed freedom. Based in Erbil and originally from Soran, I am a self-taught artist creating oil paintings that explore movement, depth, and emotion.
          </p>

          <p className="about-bio-paragraph">
            From childhood, horses have been a constant source of inspiration for me. Their silent strength and natural grace have shaped my creative journey, driving me to capture not only their form but also their inner presence. childhood, horses have been a constant source of
            inspiration. Their silent strength and natural grace have shaped
            a creative journey focused on capturing not only their form, but
            their inner presence.
          </p>

          <p className="about-bio-paragraph">
            Through richly layered oil compositions, I place horses within elemental landscapes flowing through the sea, emerging from sand, and moving through drifting dust. These imagined worlds reflect a balance between softness and power, stillness and motion. Every painting is created with intention, using texture, light, and color to reveal the beauty, spirit, and timeless presence of the horse.
          </p>

          <button
            className="about-contact-btn"
            onClick={() => setShowContactPopup(true)}
          >
            Contact Me
          </button>
        </div>

        <div className="about-photo-wrapper">
          <img src="/seapal/seapal-photo.webp" alt="Seapal Nadhim" />
        </div>
      </div>

      {showContactPopup && (
        <ContactPopup onClose={() => setShowContactPopup(false)} />
      )}
    </div>
  );
}