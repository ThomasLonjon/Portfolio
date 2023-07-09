import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import Threebox from "threebox-plugin/src/Threebox";
import "./Map.scss";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function Map1({ lat, lng, zoom, pitch, isChosen, departure, arrival }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  async function getRoute() {
    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${departure.lat},${departure.lng};${arrival.lat},${arrival.lng}?geometries=geojson&overview=full&steps=true&access_token=pk.eyJ1IjoidGhvbWFzbG9uam9uIiwiYSI6ImNsaThwNTFnYzFsd3ozZnBjczN3aDlhYzcifQ.na2-On5k8L1PUKU8Em_-Ew`
      );
      const data = await response.json();
      map.current.getSource("route").setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: data.routes[0].geometry.coordinates,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

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

    // ---------------------------------------- Add 3d object----------------------------------------
    // eslint-disable-next-line no-undef
    const tb = (window.tb = new Threebox(map.current, map.current.getCanvas().getContext("webgl"), {
      defaultLights: true,
    }));

    map.current.on("style.load", () => {
      map.current.addLayer({
        id: "custom-threebox-model",
        type: "custom",
        renderingMode: "3d",
        onAdd: function () {
          // Creative Commons License attribution:  Metlife Building model by https://sketchfab.com/NanoRay
          // https://sketchfab.com/3d-models/metlife-building-32d3a4a1810a4d64abb9547bb661f7f3
          const scale = 3.2;
          const options = {
            obj: "https://docs.mapbox.com/mapbox-gl-js/assets/metlife-building.gltf",
            type: "gltf",
            scale: { x: scale, y: scale, z: 2.7 },
            units: "meters",
            rotation: { x: 90, y: -90, z: 0 },
          };

          tb.loadObj(options, (model) => {
            model.setCoords([-73.976799, 40.754145]);
            model.setRotation({ x: 0, y: 0, z: 241 });
            tb.add(model);
          });
        },

        render: function () {
          tb.update();
        },
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng]);

  // ---------------------------------------- Route----------------------------------------

  useEffect(() => {
    map.current.on("load", () => {
      //  --------------create source route --------------
      map.current.addSource("route", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });
      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#cc6552",
          "line-width": 5,
          "line-opacity": 0.9,
        },
      });

      //  --------------create source markers --------------
      map.current.addSource("markers", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.current.addLayer({
        id: "markers",
        type: "circle",
        source: "markers",
        paint: {
          "circle-radius": 15,
          "circle-color": "#cc6552",
          "circle-opacity": 0.9,
        },
      });
    });

    if (departure.isChosen && arrival.isChosen) {
      // ------------------------------------ add marker ------------------------------------

      map.current.getSource("markers").setData({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: [departure.lat, departure.lng],
            },
          },
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: [arrival.lat, arrival.lng],
            },
          },
        ],
      });

      // ------------------------------------ get route ------------------------------------

      getRoute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departure, arrival]);

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
  arrival: PropTypes.shape({
    lng: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    pitch: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    isChosen: PropTypes.bool.isRequired,
  }).isRequired,
  departure: PropTypes.shape({
    lng: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    pitch: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    isChosen: PropTypes.bool.isRequired,
  }).isRequired,
};
