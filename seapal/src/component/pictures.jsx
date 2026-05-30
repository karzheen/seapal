import "./picture.css";

export default function Picture(props) {
  return (
    <img
      className="picture"
      src={props.src}
      alt={props.alt}
      style={{
        padding:"8px" ,
        height: props.height,
        width: props.width,
      }}
    />
  );
}
