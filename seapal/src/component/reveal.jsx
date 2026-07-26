import { useEffect, useRef, useState, cloneElement } from "react";
import "./reveal.css";

const revealedElements = new Set();

export default function Reveal({ children, variant = "fade-up", delay = 0 }) {
  const ref = useRef(null);

  const id = children.props.className || children.type;

  const [visible, setVisible] = useState(revealedElements.has(id));
  const [finished, setFinished] = useState(revealedElements.has(id));

  useEffect(() => {
    const node = ref.current;
    if (!node || revealedElements.has(id)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          revealedElements.add(id);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [id]);

  const handleTransitionEnd = () => {
    if (visible) {
      setFinished(true);
    }
  };

  const existingClassName = children.props.className || "";

  return cloneElement(children, {
    ref,
    onTransitionEnd: handleTransitionEnd,

    className: `
      ${existingClassName}
      ${finished ? "reveal-finished" : `reveal reveal-${variant} ${visible ? "reveal-visible" : ""}`}
    `.trim(),

    style: {
      ...(children.props.style || {}),
      transitionDelay: finished ? "0ms" : `${delay}ms`,
    },
  });
}