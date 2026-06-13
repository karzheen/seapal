import "./artwork.css";
export default function Artwork(props) {
  return (
    <div className="artwork-card" style={{ padding: props.padding }}>
      <img
        src={props.src}
        alt={props.alt}
        style={{ width: props.width, height: props.heigh }}
      />
      <div className="artwork-info">
        <h3>${props.price}</h3>
        <h4>{props.alt}</h4>
        <p>
          {props.subject} — {props.size}
        </p>
      </div>
    </div>
  );
}
