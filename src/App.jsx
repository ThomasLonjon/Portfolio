import { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import MyMap from "./components/MyMap";
import "./App.scss";
import mapboxgl from "mapbox-gl";

function App() {
  // ---------------------------------------------UseState-----------------------------------------

  const [position1, setPosition1] = useState({
    lat: -0.1,
    lng: 47,
    zoom: 5.1,
    pitch: 0,
    isClicked: false,
  });

  const [position2, setPosition2] = useState({
    lat: 9.12,
    lng: 42.21,
    zoom: 6.9,
    pitch: 0,
    isClicked: false,
  });

  const [position3, setPosition3] = useState({
    lat: 0.9,
    lng: 47,
    zoom: 7.1,
    pitch: 0,
    isClicked: false,
  });

  const [positionGeoCoder, setPositionGeoCoder] = useState({
    lat: -0.1,
    lng: 47,
  });

  const [isClicked, setIsClicked] = useState({
    1: false,
    2: false,
    3: false,
  });

  // const [latitude, setLatitude] = useState(-0.1);
  // const [longitude, setLongitude] = useState(47);

  // const [latitude1, setLatitude1] = useState(-0.1);
  // const [longitude1, setLongitude1] = useState(47);

  // const [latitude2, setLatitude2] = useState(9.14);
  // const [longitude2, setLongitude2] = useState(42.21);
  // const [latitude3, setLatitude3] = useState(0.9);
  // const [longitude3, setLongitude3] = useState(47);
  // const [isChosen1, setIsChosen1] = useState(false);
  // const [isChosen2, setIsChosen2] = useState(false);
  // const [isChosen3, setIsChosen3] = useState(false);
  // const [zoom1, setZoom1] = useState(5.1);
  // const [zoom2, setZoom2] = useState(6.9);
  // const [zoom3, setZoom3] = useState(7.1);
  // const [pitch1, setPitch1] = useState(0);
  // const [pitch2, setPitch2] = useState(0);
  // const [pitch3, setPitch3] = useState(0);

  // const [isClicked1, setIsClicked1] = useState(false);
  // const [isClicked2, setIsClicked2] = useState(false);
  // const [isClicked3, setIsClicked3] = useState(false);

  // ---------------------------------------------HandleClick-----------------------------------------

  const handleClick1 = () => {
    setIsClicked({ 1: true, 2: false, 3: false });
  };

  const handleClick2 = () => {
    setIsClicked({ 1: false, 2: true, 3: false });
  };

  const handleClick3 = () => {
    setIsClicked({ 1: false, 2: false, 3: true });
  };

  // ---------------------------------------------Handlechange-----------------------------------------

  const handleChange = (result) => {
    setPositionGeoCoder({
      lat: result.center[0],
      lng: result.center[1],
    });
    // setLatitude(result.center[0]);
    // setLongitude(result.center[1]);
    // setIsChosen1(true);
    // setZoom1(15.1);
    // setPitch1(50);
  };

  const handleChange1 = (a, b) => {
    setPosition1({
      ...position1,
      lat: a,
      lng: b,
      isChosen: true,
      zoom: 15.1,
      pitch: 50,
    });
  };

  const handleChange2 = (a, b) => {
    setLatitude2(a);
    setLongitude2(b);
    setIsChosen2(true);
    setZoom1(15.1);
    setPitch1(50);
  };

  const handleChange3 = (a, b) => {
    setLatitude3(a);
    setLongitude3(b);
    setIsChosen3(true);
    setZoom1(15.1);
    setPitch1(50);
  };

  // ---------------------------------------------Geocoder-----------------------------------------

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: "country,region,place,postcode,locality,neighborhood,address",
  });

  useEffect(() => {
    geocoder.addTo("#geocoder");
  }, []);

  // --------------------------------------------------------------------------------

  useEffect(() => {
    geocoder.on("result", (e) => {
      handleChange(e.result);
    });
    geocoder.on("clear", () => {});
  });

  useEffect(() => {
    if (isClicked1) {
      handleChange1(latitude, longitude);
    }
    if (isClicked2) {
      handleChange2(latitude, longitude);
    }
    if (isClicked3) {
      handleChange3(latitude, longitude);
    }
  }, [latitude, longitude]);

  // ---------------------------------------------Return---------------------------------------------

  return (
    <div className="background">
      <div className="cardTitle">
        <div className="tape-section"></div>
        <h1>Thomas Lonjon</h1>
        <h2>DÉVELOPPEUR WEB FULLSTACK JS</h2>
      </div>

      <Draggable cancel="strong">
        <div className="card1">
          <h3>EXPLOREZ DE NOUVELLES EXPERIENCES CARTOGRAPHIQUES</h3>
          <strong>
            <MyMap
              latitude={latitude1}
              longitude={longitude1}
              zoom={zoom1}
              pitch={pitch1}
              isChosen={isChosen1}
            />
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
            <MyMap
              latitude={latitude2}
              longitude={longitude2}
              zoom={zoom2}
              pitch={pitch2}
              isChosen={isChosen2}
            />
          </strong>
          <p className="credits">
            Crédits : mapbox, openstreetMap, Madison Draper
          </p>
        </div>
      </Draggable>

      <Draggable cancel="strong">
        <div className="card3">
          <div className="cursor">
            <h3>CHANGEZ D&apos;ÉCHELLE</h3>
          </div>
          <strong className="no-cursor">
            <MyMap
              latitude={latitude3}
              longitude={longitude3}
              zoom={zoom3}
              pitch={pitch3}
              isChosen={isChosen3}
            />
          </strong>
          <p className="credits">
            Crédits : mapbox, openstreetMap, Madison Draper
          </p>
        </div>
      </Draggable>

      <Draggable cancel="strong">
        <div className="card4">
          <div className="cursor">
            <h3>CHOISISSEZ VOTRE CARTE</h3>
            <div className="buttonContainer">
              <strong
                className={isClicked1 ? "clickedButton" : "button"}
                onClick={handleClick1}
              >
                Carte 1
              </strong>
              <strong
                className={isClicked2 ? "clickedButton" : "button"}
                onClick={handleClick2}
              >
                Carte 2
              </strong>
              <strong
                className={isClicked3 ? "clickedButton" : "button"}
                onClick={handleClick3}
              >
                Carte 3
              </strong>
            </div>
            <h3>TROUVEZ VOTRE DESTINATION</h3>
          </div>
          <strong className="no-cursor">
            <div id="geocoder"></div>
          </strong>
        </div>
      </Draggable>
    </div>
  );
}

export default App;
