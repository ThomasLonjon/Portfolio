import Draggable from "react-draggable";

function About() {
  return (
    <div>
      <div className="projects">
        <div className="top-tape"></div>
        <h1>MES PROJETS</h1>
      </div>

      <div className="cardProject1Container">
        <Draggable cancel="strong">
          <div className="cardProject1">
            <h3>HOLIMAP FOR HOLIDAYS</h3>
          </div>
        </Draggable>
      </div>

      <div className="cardProject2Container">
        <Draggable cancel="strong">
          <div className="cardProject2">
            <h3>THE MARIO PROJECT</h3>
          </div>
        </Draggable>
      </div>

      <div className="cardProject3Container">
        <Draggable cancel="strong">
          <div className="cardProject3">
            <h3>GUESS WHERE</h3>
          </div>
        </Draggable>
      </div>
    </div>
  );
}

export default About;
