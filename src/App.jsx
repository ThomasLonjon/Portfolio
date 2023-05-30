import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import MyMap from "./components/MyMap";
import "./App.scss";
import mapboxgl from "mapbox-gl";

function App() {
  const [latitude, setLatitude] = useState(-0.1);
  const [longitude, setLongitude] = useState(47);
  const [latitude2, setLatitude2] = useState(9.14);
  const [longitude2, setLongitude2] = useState(42.21);
  const [latitude3, setLatitude3] = useState(0.9);
  const [longitude3, setLongitude3] = useState(47);
  const [isChosen1, setIsChosen1] = useState(false);
  const [isChosen2, setIsChosen2] = useState(false);
  const [isChosen3, setIsChosen3] = useState(false);
  const [zoom1, setZoom1] = useState(5.1);
  const [zoom2, setZoom2] = useState(6.9);
  const [zoom3, setZoom3] = useState(7.1);
  const [pitch1, setPitch1] = useState(0);
  const [pitch2, setPitch2] = useState(0);
  const [pitch3, setPitch3] = useState(0);

  // ---------------------------------------------Handlechange-----------------------------------------

  const handleChange1 = (result) => {
    setLatitude(result.center[0]);
    setLongitude(result.center[1]);
    setIsChosen1(true);
    setZoom1(15.1);
    setPitch1(50);
  };

  const handleChange2 = (result) => {
    setLatitude2(result.center[0]);
    setLongitude2(result.center[1]);
    setIsChosen2(true);
    setZoom2(13.5);
  };

  const handleChange3 = (result) => {
    setLatitude3(result.center[0]);
    setLongitude3(result.center[1]);
    setIsChosen3(true);
    setZoom3(3);
  };

  // ---------------------------------------------Geocoder-----------------------------------------
  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: "country,region,place,postcode,locality,neighborhood",
    });
    geocoder.addTo("#geocoder");
    geocoder.on("result", (e) => {
      if (false) {
        handleChange1(e.result);
      }
      if (false) {
        handleChange2(e.result);
      }
      if (true) {
        handleChange3(e.result);
      }
    });
    // Clear results container when search is cleared.
    geocoder.on("clear", () => {});
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
          <strong>
            <MyMap
              latitude={latitude}
              longitude={longitude}
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
