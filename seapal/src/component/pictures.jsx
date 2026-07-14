import React, { useState } from "react"; 
import "./picture.css"; 

export default function Picture(props) { 
  const [isLoaded, setIsLoaded] = useState(false); 

  return ( 
    <img 
      className={`picture ${!isLoaded ? "picture-loading" : ""}`} 
      src={props.src} 
      alt={props.alt} 
      onLoad={() => setIsLoaded(true)} 
    /> 
  ); 
}
