import { useState, useEffect, useContext } from "react";
import Draggable from "react-draggable";
import Map1 from "../Maps/Map1";
import Map2 from "../Maps/Map2";
import Map3 from "../Maps/Map3";
import Slider from "../Slider/Slider";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import ZindexContext from "../../context/Zindex";
import paper1 from "../../assets/img/paper1.jpg";
import paper4bis from "../../assets/img/paper4bis.jpg";
import paper5 from "../../assets/img/paper5.jpg";
import "./Intro.scss";

function Intro() {
  // -------------------------------------------MediaQuery-----------------------------------------

  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
      const mediaQuery = window.matchMedia(query);
      const handleResize = () => setMatches(mediaQuery.matches);

      mediaQuery.addListener(handleResize);
      return () => mediaQuery.removeListener(handleResize);
    }, [query]);

    return matches;
  };

  const isMobile = useMediaQuery("(max-width: 600px)");

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

  const { zIndex, setZIndex } = useContext(ZindexContext);

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

  // ---------------------------------------------Desktop-----------------------------------------

  const desktop = () => (
    <div>
      <div className="cardTitle" style={{ backgroundImage: `url(${paper1})`, backgroundSize: "cover" }}>
        <div className="tape-section"></div>
        <h1>Thomas Lonjon</h1>
        <h2>DÉVELOPPEUR WEB FULLSTACK JS</h2>
      </div>

      <div
        className="card1Container"
        onMouseDown={() => handleIndex("card1")}
        style={{ zIndex: `${zIndex["card1"]}`, backgroundImage: `url(${paper1})`, backgroundSize: "cover" }}
      >
        <Draggable cancel="strong">
          <div className="card1" style={{ backgroundImage: `url(${paper4bis})`, backgroundSize: "cover" }}>
            <h3>PRÉPAREZ VOTRE EXPÉDITION</h3>
            <h4 className="subtitle">DÉPART</h4>
            <Map1 {...position1} departure={position1} arrival={position3} />
            <p className="credits"> Mapbox, Openstreetmap, Opentripmap</p>
          </div>
        </Draggable>
      </div>

      <div className="card2Container" onMouseDown={() => handleIndex("card2")} style={{ zIndex: `${zIndex["card2"]}` }}>
        <Draggable cancel="strong">
          <div className="card2" style={{ backgroundImage: `url(${paper5})`, backgroundSize: "cover" }}>
            <h3>GARDEZ LA VISION D&apos;ENSEMBLE</h3>
            <h4 className="subtitle">ITINÉRAIRE</h4>
            <Map2 {...position2} departure={position1} arrival={position3} buttonIsClicked={buttonIsClicked} />
            <p className="credits">Mapbox, Openstreetmap, Opentripmap</p>
          </div>
        </Draggable>
      </div>

      <div className="card3Container" onMouseDown={() => handleIndex("card3")} style={{ zIndex: `${zIndex["card3"]}` }}>
        <Draggable cancel="strong">
          <div className="card3" style={{ backgroundImage: `url(${paper4bis})`, backgroundSize: "cover" }}>
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
            style={{ backgroundImage: `url(${paper4bis})`, backgroundSize: "cover" }}
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

      <div className="arrowDiv">
        <p>↓ Suite de la visite ↓</p>
        <div></div>
      </div>
    </div>
  );

  // ---------------------------------------------Mobile-----------------------------------------

  const mobile = () => (
    <div>
      <div className="cardTitle" style={{ backgroundImage: `url(${paper1})`, backgroundSize: "cover" }}>
        <div className="tape-section"></div>
        <h1>Thomas Lonjon</h1>
        <h2>DÉVELOPPEUR WEB FULLSTACK JS</h2>
      </div>

      <div
        className="card1Container"
        onMouseDown={() => handleIndex("card1")}
        style={{ zIndex: `${zIndex["card1"]}`, backgroundImage: `url(${paper1})`, backgroundSize: "cover" }}
      >
        <div className="card1" style={{ backgroundImage: `url(${paper4bis})`, backgroundSize: "cover" }}>
          <h3>PRÉPAREZ VOTRE EXPÉDITION</h3>
          <h4 className="subtitle">DÉPART</h4>
          <Map1 {...position1} departure={position1} arrival={position3} />
          <p className="credits"> Mapbox, Openstreetmap, Opentripmap</p>
        </div>
      </div>

      <div className="card2Container" onMouseDown={() => handleIndex("card2")} style={{ zIndex: `${zIndex["card2"]}` }}>
        <Draggable cancel="strong">
          <div className="card2" style={{ backgroundImage: `url(${paper5})`, backgroundSize: "cover" }}>
            <h3>GARDEZ LA VISION D&apos;ENSEMBLE</h3>
            <h4 className="subtitle">ITINÉRAIRE</h4>
            <Map2 {...position2} departure={position1} arrival={position3} buttonIsClicked={buttonIsClicked} />
            <p className="credits">Mapbox, Openstreetmap, Opentripmap</p>
          </div>
        </Draggable>
      </div>

      <div className="card3Container" onMouseDown={() => handleIndex("card3")} style={{ zIndex: `${zIndex["card3"]}` }}>
        <Draggable cancel="strong">
          <div className="card3" style={{ backgroundImage: `url(${paper4bis})`, backgroundSize: "cover" }}>
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
            style={{ backgroundImage: `url(${paper4bis})`, backgroundSize: "cover" }}
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

      <div className="arrowDiv">
        <p>↓ Suite de la visite ↓</p>
        <div></div>
      </div>
    </div>
  );

  return <>{!isMobile ? desktop() : mobile()}</>;
}

export default Intro;
