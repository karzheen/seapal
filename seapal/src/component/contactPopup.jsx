import React, { useState, useEffect } from "react";
import "./contactPopup.css";

export default function ContactPopup({ onClose }) {
  const [numberCopied, setNumberCopied] = useState(false);

  // WhatsApp number (international format without +, spaces, or dashes)
  const whatsappNumber = "9647500000000";
  const displayPhoneNumber = "0750 123 4567";

  useEffect(() => {
    const scrollY = window.scrollY;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  const copyPhoneNumber = async () => {
    try {
      await navigator.clipboard.writeText(displayPhoneNumber);
      setNumberCopied(true);
      window.setTimeout(() => setNumberCopied(false), 2000);
    } catch {
      // Clipboard access can be unavailable in non-secure browser contexts.
    }
  };

  const messageText = encodeURIComponent(
    "Hello ArtDelaSea, I'd like to get in touch."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${messageText}`;

  return (
    <div className="contact-popup-overlay" onClick={onClose}>
      <div className="contact-popup-card" onClick={(e) => e.stopPropagation()}>
        <div className="contact-popup-close-row">
          <button className="contact-popup-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="contact-popup-content">
          <h4 className="contact-popup-title">You'll be redirected to WhatsApp</h4>
          <p className="contact-popup-subtext">
            Tap the button below to start a chat, or reach out directly using
            the number below.
          </p>

          <div className="contact-phone-num">
            <div className="contact-phone-details">
              <img src="/seapal/Phone.svg" alt="" />
              <p>{displayPhoneNumber}</p>
            </div>
            <button
              className="contact-copy-phone-button"
              type="button"
              onClick={copyPhoneNumber}
              aria-label="Copy phone number"
            >
              {numberCopied ? (
                <img className="contact-copied-check" src="/seapal/check.svg" alt="" />
              ) : (
                <img src="/seapal/CopySimple.svg" alt="" />
              )}
            </button>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-whatsapp-btn"
          >
            <svg className="contact-whatsapp-inline-svg" viewBox="0 0 448 512">
              <path
                fill="currentColor"
                d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
              />
            </svg>
            Open WhatsApp
          </a>
        </div>

        {numberCopied && (
          <div className="contact-copy-toast" role="status">
            Number copied
          </div>
        )}
      </div>
    </div>
  );
}