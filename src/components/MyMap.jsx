import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// ---------------------------------------- FUNCTION----------------------------------------

function MyMap({ latitude, longitude, zoom, pitch, isChosen }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) {
      map.current.remove(); // Supprime l'ancienne instance de la carte
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/thomaslonjon/clhz4ydld02dr01pg5mdkaycb",
      center: [latitude, longitude],
      zoom: zoom,
      antialias: true,
    });
  }, []);

  useEffect(() => {
    if (isChosen) {
      map.current.flyTo({
        center: [latitude, longitude],
        essential: true,
        duration: 12000,
        zoom: zoom,
        pitch: pitch,
      });
      return;
    }
  }, [latitude, longitude]);

  // ---------------------------------------- RETURN----------------------------------------

  return <div ref={mapContainer} className="map" />;
}

export default MyMap;

MyMap.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  isChosen: PropTypes.bool.isRequired,
};
