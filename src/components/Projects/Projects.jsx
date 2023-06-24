import Draggable from "react-draggable";

import mario from "../../assets/img/mario.png";
import guesswhat from "../../assets/img/GuessWhat.png";
import holimap from "../../assets/img/Holymap.png";
import "./Projects.scss";

function Projects() {
  return (
    <div className="project-section">
      <div className="project-section-title">
        <div className="top-tape"></div>
        <h1>MES PROJETS</h1>
      </div>

      <div className="cardProject1Container">
        <Draggable cancel="strong">
          <div className="cardProject1 card">
            <h3>HOLIMAP FOR HOLIDAYS</h3>
            <img src={holimap} alt="holimap" className="imgProject" />
            <div className="bottom-icons">
              <div className="stack">
                <span>HTML</span>
                <span>CSS</span>
                <span>React</span>
                <span>REST APIs</span>
                <span>MapboxGL</span>
              </div>
              <span className="github">→ GitHub ←</span>
            </div>
          </div>
        </Draggable>
      </div>

      <div className="cardProject2Container">
        <Draggable cancel="strong">
          <div className="cardProject2 card">
            <h3>THE MARIO PROJECT</h3>
            <img src={mario} alt="mario" className="imgProject" />
            <div className="bottom-icons">
              <div className="stack">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
              </div>
              <span className="github">→ GitHub ←</span>
            </div>
          </div>
        </Draggable>
      </div>

      <div className="cardProject3Container">
        <Draggable cancel="strong">
          <div className="cardProject3 card">
            <h3>GUESS WHAT</h3>
            <img src={guesswhat} alt="guessWhat" className="imgProject" />
            <div className="bottom-icons">
              <div className="stack">
                <span>HTML</span>
                <span>CSS</span>
                <span>React</span>
                <span>REST APIs</span>
                <span>MapboxGL</span>
              </div>
              <span className="github">→ GitHub ←</span>
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  );
}

export default Projects;
