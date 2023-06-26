import "./GuessWhat.scss";
import video from "../../assets/video/GuessWhat.mp4";
import paper2 from "../../assets/img/paper2.jpg";

function GuessWhat() {
  return (
    <div className="backgroundHolimap">
      <div className="projectContainer" style={{ backgroundImage: `url(${paper2})`, backgroundSize: "cover" }}>
        <h1>GuessWhat!?</h1>
        <h3>Projet Wild Code School</h3>
        <p>
          Nous avons créé un Quizz en ligne. <br />
          Il est possible de choisir entre 4 thèmes, dont mon préféré : un blindtest de carte aérienne ! <br />
          Nous nous sommes basé.e.s sur des données issues d&apos;API REST ouvertes avant de générer des questions de
          manière totalement aléatoire.
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

export default GuessWhat;
