import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// ---------------------------------------- FUNCTION----------------------------------------

function MyMap({ latitude, longitude, zoom }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      // style: "mapbox://styles/thomaslonjon/clhgjollg01ec01p6clov3ebc",
      style: "mapbox://styles/thomaslonjon/clhz4ydld02dr01pg5mdkaycb",
      center: [latitude, longitude],
      zoom: zoom,
      antialias: true,
    });

    // map.addControl(
    //   new MapboxDirections({
    //     accessToken: mapboxgl.accessToken,
    //   }),
    //   "top-left"
    // );
  }, [latitude, longitude]);

  // ---------------------------------------- RETURN----------------------------------------

  return (
    <div className="map-container">
        <div ref={mapContainer} className="map" />
    </div>
  );
}

export default MyMap;

MyMap.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  isChosen: PropTypes.bool.isRequired,
};
