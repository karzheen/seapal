import "./artwork.css"; 
import { useNavigate } from "react-router-dom"; 
import { useState } from "react"; // 1. Added state tracker

export default function Artwork(props) { 
  const navigate = useNavigate(); 
  const [isLoaded, setIsLoaded] = useState(false); // 2. Starts as false

  return ( 
    <div 
      className="artwork-card" 
      onClick={() => navigate(`/detail/${props.id}`)} 
      style={{ cursor: "pointer" }} 
    > 
      <img 
        /* 3. Applies the skeleton-loading class until native onLoad triggers */
        className={`artwork-img ${!isLoaded ? "skeleton-loading" : ""}`}
        src={props.src} 
        alt={props.alt} 
        onLoad={() => setIsLoaded(true)} 
      /> 
      
      <div className="artwork-info"> 
        <h3>${props.price}</h3> 
        <div className="artwork-description">
          <h4>{props.alt}</h4> 
          <p>{props.size} <span className="artwork-size-unit">cm</span></p>
        </div> 
      </div> 
    </div> 
  ); 
}
