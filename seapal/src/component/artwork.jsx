import "./artwork.css";
// 1. IMPORT THE NAVIGATE HOOK
import { useNavigate } from "react-router-dom";

export default function Artwork(props) {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div 
      className="artwork-card" 
      /* 2. TRIGGER ROUTE NAVIGATION ON CARD CLICK */
      onClick={() => navigate(`/detail/${props.id}`)}
      style={{ cursor: "pointer" }} 
    >
      <img
        src={props.src}
        alt={props.alt}
        style={{ width: "100%", height: "auto" }} 
      />
      <div className="artwork-info">
        <h3>${props.price}</h3>
        <h4>{props.alt}</h4>
        <p>{props.subject} — {props.size}</p>
      </div>
    </div>
  );
}
