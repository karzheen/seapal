import "./home.css";
import Picture from "../component/pictures";
import pics from "../data/picData";
export default function Home() {
  const picsarr = pics.map((pic) => (
    <Picture
      key={pic.id}
      src={pic.src}
      alt={pic.alt}
      padding={pic.padding}
      width={pic.width}
      height={pic.height}
    />
  ));
  /*change the pictures to dynamic with backend use their ID to retrive from backend*/
  /*put this in different component and do the other two parts */

  return (
    <div>
      <div className="sidebar">
        <img className="imgsidebar" src="src/img/rectangle.png" />
      </div>
      {/*home*/}
      <div className="home">
        <section className="pic1"> {picsarr[0]}</section>
        <section className="pic2"> {picsarr[1]}</section>
        {/*COLLECTION YEAR*/}
        <section className="collectionsec ">
          <div className="line-behind">
            <div className="the">THE</div>
          </div>
          <div className="line-behind">
            <div className="year">2026</div>
          </div>
          <div className="line-behind">
            <div className="collection">COLLECTION</div>
          </div>
        </section>
        <section className="pic3"> {picsarr[2]}</section>
        <section className="pic4"> {picsarr[3]}</section>
        <section className="pic5"> {picsarr[4]}</section>
        <section className="pic6"> {picsarr[5]}</section>
        <section className="pic7"> {picsarr[6]}</section>
        <section className="qoute">
          {/*flower*/}
          <p className="qoutesub">
            "The longer you look at an object, the more abstract it becomes,
            and, ironically, the more real."
          </p>
          <p className="name">— Lucian Freud</p>{" "}
        </section>
      </div>
      {/*THE ANATOMY OF THE STROKE*/}
      <div className="anatomy">
        <section className="anatomytitle">
          <img src="src/img/THEANATOMY.svg" />
        </section>
        <div className="anatomycontent">
          <img src="src/img/black.svg" />
          <section>
            <section>
              <div className="line-behind">
                <div className="collection">BONE</div>
              </div>
              <div className="line-behind">
                <div className="collection">TIDES</div>
              </div>
              <div className="line-behind">
                <div className="collection">COLOR</div>
              </div>
              <dic className="anatomyqoute">
                I translate the weight of the ocean and the fragility of the
                flower into the language of the human face.
              </dic>
            </section>
            <img src="src/img/yellow.svg" />
          </section>
        </div>
      </div>
      {/*behind the canvas*/}
      <div>
        <img src="src/img/behind.svg" />
      </div>
    </div>
  );
}
