import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function Map1({ lat, lng, zoom, pitch, isChosen, rangeValue }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const urlBase = "https://api.mapbox.com/isochrone/v1/mapbox/";
  const [profile, setProfile] = useState("cycling");
  const [isochrone, setIsochrone] = useState(null);
  // const [location, setLocation] = useState(null);

  // ---------------------------------------- Add map----------------------------------------
  useEffect(() => {
    if (map.current) {
      map.current.remove(); // Supprime l'ancienne instance de la carte
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/thomaslonjon/clhz4ydld02dr01pg5mdkaycb",
      center: [lat, lng],
      zoom: zoom,
      antialias: true,
    });
  }, []);

  // ---------------------------------------- FlyTo----------------------------------------

  useEffect(() => {
    if (isChosen) {
      map.current.flyTo({
        center: [lat, lng],
        essential: true,
        duration: 9000,
        zoom: zoom,
        pitch: pitch,
      });
      return;
    }
  }, [lat, lng]);

  // ---------------------------------------- IsoChrone ----------------------------------------

  useEffect(() => {
    map.current.on("load", () => {
      // When the map loads, add the source and layer

      map.current.addSource("iso", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.current.addLayer(
        {
          id: "isoLayer",
          type: "fill",
          source: "iso",
          layout: {},
          paint: {
            "fill-color": "#cc6552",
            "fill-opacity": 0.3,
          },
        },
        "poi-label"
      );
      getIso();
    });
    async function getIso() {
      await fetch(
        `${urlBase}${profile}/${lat},${lng}?contours_minutes=${rangeValue}&polygons=true&access_token=${mapboxgl.accessToken}`,
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((data) => {
          setIsochrone(data);
          map.current.getSource("iso").setData(data);
        })
        .catch((err) => console.error(err));
    }
    getIso();
  }, [rangeValue, lat, lng]);

  // ---------------------------------------- RETURN----------------------------------------

  return (
    <strong className="no-cursor">
      <div ref={mapContainer} className="map" />
    </strong>
  );
}

export default Map1;

Map1.propTypes = {
  lng: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  pitch: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  isChosen: PropTypes.bool.isRequired,
};
