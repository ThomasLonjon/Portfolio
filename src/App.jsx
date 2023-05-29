// import { useState } from "react";
import Draggable from "react-draggable";
import MyMap from "./components/MyMap";
import "./App.css";

function App() {
  return (
    <div className="background">
      <Draggable cancel="strong">
        <div className="card1">
          <div className="cursor">
            <h1>EXPLORING NEW MAP EXPERIENCES</h1>
          </div>
          <strong className="no-cursor">
            <MyMap latitude={15} longitude={2.7} zoom={2} />
          </strong>
        </div>
      </Draggable>

      <Draggable cancel="strong">
        <div className="card2">
          <div className="cursor">
            <h1>Exploring new map experiences</h1>
          </div>
          <strong className="no-cursor">
            <MyMap latitude={-1.2} longitude={56} zoom={4} />
          </strong>
        </div>
      </Draggable>
    </div>
  );
}

export default App;
