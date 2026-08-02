import "./artwork.css"; 
import { useNavigate } from "react-router-dom"; 
import { useState } from "react";
import { formatDimensions } from "../utils/artworkDimensions";

export default function Artwork(props) { 
  const navigate = useNavigate(); 
  const [isLoaded, setIsLoaded] = useState(false); // 2. Starts as false

  return ( 
    <div 
      className="artwork-card" 
      onClick={() => navigate(`/detail/${props.id}`)} 
      style={{ cursor: "pointer" }} 
    > 
      <div className="artwork-img-wrapper">
        {props.sold && <span className="sold-badge">Sold</span>}
        <img 
          /* 3. Applies the skeleton-loading class until native onLoad triggers */
          className={`artwork-img ${!isLoaded ? "skeleton-loading" : ""}`}
          src={props.src} 
          alt={props.alt} 
          onLoad={() => setIsLoaded(true)} 
        /> 
      </div>
      
      <div className="artwork-info"> 
        <h3>${props.price}</h3> 
        <div className="artwork-description">
          <h4>{props.alt}</h4> 
          <p>{formatDimensions(props)}</p>
        </div> 
      </div> 
    </div> 
  ); 
}