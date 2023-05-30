// import { useState } from "react";
import Draggable from "react-draggable";
import MyMap from "./components/MyMap";
import "./App.scss";

function App() {
  return (
    <div className="background">
      <div className="cardTitle">
        <div className="tape-section"></div>
        <h1>Thomas Lonjon</h1>
        <h2>DÉVELOPPEUR WEB FULLSTACK</h2>
      </div>
      <Draggable cancel="strong">
        <div className="card1">
          <h2>EXPLORATIONS CARTOGRAPHIQUES</h2>
          <strong>
            <MyMap latitude={-0.1} longitude={47} zoom={5.02} />
          </strong>
          <p className="credits">
            Crédits : mapbox, openstreetMap, Madison Draper
          </p>
        </div>
      </Draggable>

      <Draggable cancel="strong">
        <div className="card2">
          <div className="cursor">
            <h3>PRÉPAREZ VOTRE EXPÉDITION</h3>
          </div>
          <strong className="no-cursor">
            <MyMap latitude={9.14} longitude={42.21} zoom={6.9} />
          </strong>
          <p className="credits">
            Crédits : mapbox, openstreetMap, Madison Draper
          </p>
        </div>
      </Draggable>

      <Draggable cancel="strong">
        <div className="card3">
          <div className="cursor">
            <h3>JOUEZ AVEC L&apos;ÉCHELLE</h3>
          </div>
          <strong className="no-cursor">
            <MyMap latitude={5.8} longitude={43.29} zoom={7.1} />
          </strong>
          <p className="credits">
            Crédits : mapbox, openstreetMap, Madison Draper
          </p>
        </div>
      </Draggable>

      <Draggable cancel="strong">
        <div className="card4">
          <div className="cursor">
            <h3>TROUVEZ VOTRE DESTINATION</h3>
          </div>
          <strong className="no-cursor"></strong>
        </div>
      </Draggable>
    </div>
  );
}

export default App;
