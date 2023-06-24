import { useContext } from "react";
import Draggable from "react-draggable";
import ZindexContext from "../../context/Zindex";

import mario from "../../assets/img/mario.png";
import guesswhat from "../../assets/img/GuessWhat.png";
import holimap from "../../assets/img/Holymap.png";
import "./Projects.scss";

function Projects() {
  // ---------------------------------------------HandleIndex-----------------------------------------

  const { zIndex, setZIndex } = useContext(ZindexContext);

  const handleIndex = (divID) => {
    setZIndex((prevState) => {
      let arr = Object.values(zIndex);
      let max = Math.max(...arr);
      return {
        ...prevState,
        [divID]: max + 1,
      };
    });
  };

  return (
    <div className="project-section">
      <div className="project-section-title">
        <div className="top-tape"></div>
        <h1>MES PROJETS</h1>
      </div>

      <div
        className="cardProject1Container"
        onMouseDown={() => handleIndex("cardProject1")}
        style={{ zIndex: `${zIndex["cardProject1"]}` }}
      >
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
              <a href="https://github.com/Sashiki05/Hackathon-01" target="_blank" rel="noopener noreferrer">
                <span className="github">→ GitHub ←</span>
              </a>
            </div>
          </div>
        </Draggable>
      </div>

      <div
        className="cardProject2Container"
        onMouseDown={() => handleIndex("cardProject2")}
        style={{ zIndex: `${zIndex["cardProject2"]}` }}
      >
        <Draggable cancel="strong">
          <div className="cardProject2 card">
            <h3>THE MARIO PROJECT</h3>
            <a href="https://t0mle.github.io/WCS-project1/" target="_blank" rel="noopener noreferrer">
              <img src={mario} alt="mario" className="imgProject" />
            </a>

            <div className="bottom-icons">
              <div className="stack">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
              </div>
              <a href="https://github.com/T0MLE/WCS-project1" target="_blank" rel="noopener noreferrer">
                <span className="github">→ GitHub ←</span>
              </a>
            </div>
          </div>
        </Draggable>
      </div>

      <div
        className="cardProject3Container"
        onMouseDown={() => handleIndex("cardProject3")}
        style={{ zIndex: `${zIndex["cardProject3"]}` }}
      >
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
              <a href="https://github.com/ThomasLonjon/Guess" target="_blank" rel="noopener noreferrer">
                <span className="github">→ GitHub ←</span>
              </a>
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  );
}

export default Projects;
