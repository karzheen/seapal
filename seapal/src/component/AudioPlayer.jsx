import React, { useEffect, useRef } from "react"; 

export default function AudioPlayer() { 
  const audioRef = useRef(null); 

  useEffect(() => { 
    const handleFirstInteraction = () => { 
      if (audioRef.current) { 
        audioRef.current.play() 
          .then(() => { 
            cleanUpListeners(); 
          }) 
          .catch((error) => { 
            console.log("Playback pending user interaction:", error); 
          }); 
      } 
    }; 

    const cleanUpListeners = () => { 
      window.removeEventListener("click", handleFirstInteraction); 
      window.removeEventListener("keydown", handleFirstInteraction); 
      window.removeEventListener("touchstart", handleFirstInteraction); 
    }; 

    window.addEventListener("click", handleFirstInteraction); 
    window.addEventListener("keydown", handleFirstInteraction); 
    window.addEventListener("touchstart", handleFirstInteraction); 

    return () => cleanUpListeners(); 
  }, []); 

  return ( 
    /* FIXED: Added the required leading slash before seapal */
    <audio 
      ref={audioRef} 
      src="/seapal/music.mp3" 
      loop 
      style={{ display: "none" }} 
    /> 
  ); 
}
