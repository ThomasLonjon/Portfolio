import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import Map1 from "./components/Map1";
import Map2 from "./components/Map2";
import Map3 from "./components/Map3";
import Slider from "./components/Slider";
import "./App.scss";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

function App() {
  // -------------------------------------------UseStates-----------------------------------------

  const [position1, setPosition1] = useState({
    lat: 9.12,
    lng: 42.1,
    zoom: 6.55,
    pitch: 0,
    isChosen: false,
  });

  // eslint-disable-next-line no-unused-vars
  const [position2, setPosition2] = useState({
    lat: 5.492516199502727,
    lng: 43.21716380376564,
    zoom: 7.2,
    pitch: 0,
    isChosen: false,
  });

  const [position3, setPosition3] = useState({
    lat: -0.1,
    lng: 47,
    zoom: 5.1,
    pitch: 0,
    isChosen: false,
  });

  const [positionGeoCoder, setPositionGeoCoder] = useState({
    lat: -0.1,
    lng: 47,
  });

  const [buttonIsClicked, setButtonIsClicked] = useState({
    firstButton: false,
    secondButton: false,
  });

  const [rangeValue, setRangeValue] = useState(10);

  const [zIndex, setZIndex] = useState({
    card1: 1,
    card2: 3,
    card3: 0,
    card4: 2,
  });

  // ---------------------------------------------HandleIndex-----------------------------------------

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

  // ---------------------------------------------HandleClick Button-----------------------------------------

  const handleClick1 = () => {
    setButtonIsClicked({ ...buttonIsClicked, firstButton: true, secondButton: false });
  };

  const handleClick2 = () => {
    setButtonIsClicked({ ...buttonIsClicked, firstButton: false, secondButton: true });
  };

  // ----------------------------------------Handlechange Geocoder Input-----------------------------------------

  const handleChange = (result) => {
    setPositionGeoCoder({
      lat: result.center[0],
      lng: result.center[1],
    });
  };
  // -----------------------------------Handlechange Set Map Position -----------------------------------------

  const handleChange1 = (a, b) => {
    setPosition1({
      ...position1,
      lat: a,
      lng: b,
      isChosen: true,
      zoom: 15.5,
      pitch: 15,
    });
  };

  const handleChange3 = (a, b) => {
    setPosition3({
      ...position3,
      lat: a,
      lng: b,
      isChosen: true,
      zoom: 12,
      pitch: 0,
    });
  };

  // ---------------------------------------------Geocoder-----------------------------------------

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: "place,postcode,locality,neighborhood,address",
  });

  useEffect(() => {
    geocoder.addTo("#geocoder");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    geocoder.on("result", (e) => {
      handleChange(e.result);
    });
    geocoder.on("clear", () => {});
  });

  useEffect(() => {
    if (buttonIsClicked.firstButton) {
      handleChange1(positionGeoCoder.lat, positionGeoCoder.lng);
    }
    if (buttonIsClicked.secondButton) {
      handleChange3(positionGeoCoder.lat, positionGeoCoder.lng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionGeoCoder.lat, positionGeoCoder.lng]);

  // ---------------------------------------------Return---------------------------------------------

  return (
    <div className="background">
      <div className="cardTitle">
        <div className="tape-section"></div>
        <h1>Thomas Lonjon</h1>
        <h2>DÉVELOPPEUR WEB FULLSTACK JS</h2>
      </div>

      <div className="card1Container" onMouseDown={() => handleIndex("card1")} style={{ zIndex: `${zIndex["card1"]}` }}>
        <Draggable cancel="strong">
          <div className="card1">
            <h3>PRÉPAREZ VOTRE EXPÉDITION</h3>
            <h4 className="subtitle">DÉPART</h4>
            <Map1 {...position1} departure={position1} arrival={position3} />
            <p className="credits"> Mapbox, Openstreetmap, Opentripmap</p>
          </div>
        </Draggable>
      </div>

      <div className="card2Container" onMouseDown={() => handleIndex("card2")} style={{ zIndex: `${zIndex["card2"]}` }}>
        <Draggable cancel="strong">
          <div className="card2">
            <h3>GARDEZ LA VISION D&apos;ENSEMBLE</h3>
            <h4 className="subtitle">ITINÉRAIRE</h4>
            <Map2 {...position2} departure={position1} arrival={position3} buttonIsClicked={buttonIsClicked} />
            <p className="credits">Mapbox, Openstreetmap, Opentripmap</p>
          </div>
        </Draggable>
      </div>

      <div className="card3Container" onMouseDown={() => handleIndex("card3")} style={{ zIndex: `${zIndex["card3"]}` }}>
        <Draggable cancel="strong">
          <div className="card3">
            <h3>EXPLOREZ DE NOUVELLES EXPÉRIENCES CARTOGRAPHIQUES</h3>
            <h4 className="subtitle">DESTINATION</h4>
            <Map3 {...position3} rangeValue={rangeValue} departure={position1} arrival={position3} />
            <p className="credits">Mapbox, OpenstreetMap, Opentripmap</p>
            <div className={position1.isChosen && position3.isChosen ? "" : "sliderContainerHidden"}>
              <Slider
                maxRange={60}
                defaultRange={10}
                unit="minutes à vélo"
                rangeValue={rangeValue}
                setRangeValue={setRangeValue}
              />
            </div>
          </div>
        </Draggable>
      </div>

      <div className="card4Container" onMouseDown={() => handleIndex("card4")} style={{ zIndex: `${zIndex["card4"]}` }}>
        <Draggable cancel="strong">
          <div
            className={`card4 ${
              buttonIsClicked.firstButton || buttonIsClicked.secondButton ? "card4Tall" : "card4Small"
            }`}
          >
            <div className="firstPart">
              <h3>CHOISISSEZ VOTRE CARTE</h3>
              <div className="buttonContainer">
                <strong className={buttonIsClicked.firstButton ? "clickedButton" : "button"} onClick={handleClick1}>
                  DÉPART
                </strong>
                <strong className={buttonIsClicked.secondButton ? "clickedButton" : "button"} onClick={handleClick2}>
                  DESTINATION
                </strong>
              </div>
            </div>
            <div
              className={
                buttonIsClicked.firstButton || buttonIsClicked.secondButton ? "secondPart" : "secondPartHidden"
              }
            >
              <h3> {buttonIsClicked.firstButton ? "DÉFINISSEZ VOTRE DÉPART" : "TROUVEZ VOTRE DESTINATION"}</h3>
              <strong className="no-cursor">
                <div id="geocoder"></div>
              </strong>
            </div>
          </div>
        </Draggable>
      </div>

      <div className="arrowCardContainer">
        <Draggable>
          <div className="arrowCard">
            <p>CONTINUEZ LA VISITE</p>
            <h4>⌄</h4>
          </div>
        </Draggable>
      </div>

      <div className="AboutMe">
        <div className="tape-section"></div>
        <h1>À PROPOS</h1>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
          College in Virginia
        </p>
        <p>
          Looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the
          cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections
          1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45
          BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of
          Lorem Ipsum
        </p>
      </div>

      <div className="skills">
        <div className="tape-section"></div>
        <h1>COMPÉTENCES</h1>
      </div>

      <div className="contactMe">
        <div className="tape-section"></div>
        <h1>CONTACT</h1>
      </div>

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

export default App;
