import "./Holimap.scss";
import video from "../../assets/video/HolyMap.mp4";
import paper2 from "../../assets/img/paper2.jpg";

function Holimap() {
  return (
    <div className="backgroundHolimap">
      <div className="projectContainer" style={{ backgroundImage: `url(${paper2})`, backgroundSize: "cover" }}>
        <h1> Holimap For Holidays</h1>
        <h3>Hackaton</h3>
        <p>
          Hackaton de 2 jours sur le thème des vacances à partir d&apos;API REST ouvertes.
          <br /> Nous avons décidé de travailler à partir d&apos;une carte et de proposer des points d&apos;intérêt
          autour d&apos;un lieu de destination. <br />
          Nous voulions permettre d&apos;organiser un séjour à vélo en indiquant le périmètre accessible en un temps
          donné.
        </p>

        <div className="videoContainer">
          <video autoPlay muted controls>
            <source src={video} />
          </video>
        </div>
      </div>
    </div>
  );
}

export default Holimap;
