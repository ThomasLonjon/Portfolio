import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import MyMap from "./components/MyMap";
import "./App.scss";
import mapboxgl from "mapbox-gl";

function App() {
  // -------------------------------------------UseStates-----------------------------------------

  const [position1, setPosition1] = useState({
    mapNumber: 1,
    lat: -0.1,
    lng: 47,
    zoom: 5.1,
    pitch: 0,
    isChosen: false,
  });

  const [position2, setPosition2] = useState({
    mapNumber: 2,
    lat: 9.12,
    lng: 42.21,
    zoom: 6.9,
    pitch: 0,
    isChosen: false,
  });

  const [position3, setPosition3] = useState({
    mapNumber: 3,
    lat: 0.9,
    lng: 47,
    zoom: 7.1,
    pitch: 0,
    isChosen: false,
  });

  const [positionGeoCoder, setPositionGeoCoder] = useState({
    lat: -0.1,
    lng: 47,
  });

  const [isClicked, setIsClicked] = useState({
    first: false,
    second: false,
    third: false,
  });

  // ---------------------------------------------HandleClick Button-----------------------------------------

  const handleClick1 = () => {
    setIsClicked({ first: true, second: false, third: false });
  };

  const handleClick2 = () => {
    setIsClicked({ first: false, second: true, third: false });
  };

  const handleClick3 = () => {
    setIsClicked({ first: false, second: false, third: true });
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
      zoom: 15.1,
      pitch: 50,
    });
  };

  const handleChange2 = (a, b) => {
    setPosition2({
      ...position2,
      lat: a,
      lng: b,
      isChosen: true,
      zoom: 15.1,
    });
  };

  const handleChange3 = (a, b) => {
    setPosition3({
      ...position3,
      lat: a,
      lng: b,
      isChosen: true,
      zoom: 9,
    });
  };

  const [route, setRoute] = useState({});

  // ---------------------------------------------Geocoder-----------------------------------------

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: "country,region,place,postcode,locality,neighborhood,address",
  });

  useEffect(() => {
    geocoder.addTo("#geocoder");
  }, []);

  useEffect(() => {
    geocoder.on("result", (e) => {
      handleChange(e.result);
    });
    geocoder.on("clear", () => {});
  });

  useEffect(() => {
    if (isClicked.first) {
      handleChange1(positionGeoCoder.lat, positionGeoCoder.lng);
    }
    if (isClicked.second) {
      handleChange2(positionGeoCoder.lat, positionGeoCoder.lng);
    }
    if (isClicked.third) {
      handleChange3(positionGeoCoder.lat, positionGeoCoder.lng);
    }
  }, [positionGeoCoder.lat, positionGeoCoder.lng]);

  // ---------------------------------------- getDirection----------------------------------------

  useEffect(() => {
    fetch(
      "https://api.mapbox.com/directions/v5/mapbox/cycling/48,2;45,4?geometries=geojson&access_token=pk.eyJ1IjoidGhvbWFzbG9uam9uIiwiYSI6ImNsaThwNTFnYzFsd3ozZnBjczN3aDlhYzcifQ.na2-On5k8L1PUKU8Em_-Ew"
    )
      .then((response) => response.json())
      .then((data) => setRoute(data.routes[0].geometry.coordinates))
      .catch((err) => console.error(err));
  }, []);

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
          <MyMap {...position1} route={route} />
          <p className="credits">Crédits : mapbox, openstreetMap, Madison Draper</p>
        </div>
      </Draggable>

      <Draggable cancel="strong">
        <div className="card2">
          <div className="cursor">
            <h3>PRÉPAREZ VOTRE EXPÉDITION</h3>
          </div>
          <MyMap {...position2} route={route} />
          <p className="credits">Crédits : mapbox, openstreetMap, Madison Draper</p>
        </div>
      </Draggable>

      <Draggable cancel="strong">
        <div className="card3">
          <div className="cursor">
            <h3>CHANGEZ D&apos;ÉCHELLE</h3>
          </div>
          <MyMap {...position3} route={route} />
          <p className="credits">Crédits : mapbox, openstreetMap, Madison Draper</p>
        </div>
      </Draggable>

      <Draggable cancel="strong">
        <div className="card4">
          <div className="cursor">
            <h3>CHOISISSEZ VOTRE CARTE</h3>
            <div className="buttonContainer">
              <strong className={isClicked.first ? "clickedButton" : "button"} onClick={handleClick1}>
                Carte 1
              </strong>
              <strong className={isClicked.second ? "clickedButton" : "button"} onClick={handleClick2}>
                Carte 2
              </strong>
              <strong className={isClicked.third ? "clickedButton" : "button"} onClick={handleClick3}>
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
