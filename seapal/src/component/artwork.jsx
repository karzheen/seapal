export default function Artwork(props) { 
  const navigate = useNavigate(); 
  const [isLoaded, setIsLoaded] = useState(false); 

  return ( 
    <div 
      className="artwork-card" 
      onClick={() => navigate(`/detail/${props.id}`)} 
      style={{ cursor: "pointer" }} 
    > 
      {/* Container wraps image and tag together */}
      <div className="artwork-img-container">
        {props.sold && <span className="sold-tag">SOLD</span>}
        
        <img 
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
