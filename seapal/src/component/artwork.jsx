import "./artwork.css";

export default function Artwork(props) {
  return (
    <div className="artwork-card">
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
