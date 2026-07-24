import { useEffect, useRef, useState, cloneElement } from "react";
import "./reveal.css";

/**
 * Wraps a single element and reveals it (fade/slide/scale) once when it
 * scrolls into view. Clones the child instead of wrapping it in a new div,
 * so grid-column/grid-row placement on the child still works untouched.
 *
 * variant: "fade-up" | "fade-left" | "fade-right" | "scale"
 * delay: ms, for staggering multiple items
 */
export default function Reveal({ children, variant = "fade-up", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node); // only once
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const existingClassName = children.props.className || "";

  return cloneElement(children, {
    ref,
    className: `${existingClassName} reveal reveal-${variant} ${
      visible ? "reveal-visible" : ""
    }`.trim(),
    style: {
      ...(children.props.style || {}),
      transitionDelay: `${delay}ms`,
    },
  });
}