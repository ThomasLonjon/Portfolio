import Draggable from "react-draggable";
import "./Project.scss";

function Project() {
  return (
    <Draggable cancel="strong">
      <div className="cardProject">
        <h3>GUESS WHAT</h3>
        <img src={guesswhat} alt="guessWhat" className="imgProject" />
        <div className="stack">
          <span>HTML</span>
          <span>CSS</span>
          <span>JavaScript</span>
          <span>React</span>
          <span>API Rest</span>
        </div>
      </div>
    </Draggable>
  );
}

export default Project;
