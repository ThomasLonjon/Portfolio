import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.scss";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const opentripmapAccessToken = import.meta.env.VITE_OPENTRIPMAP_API_KEY;

function Map3({ lat, lng, zoom, pitch, isChosen, rangeValue, arrival, departure }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const urlBase = "https://api.mapbox.com/isochrone/v1/mapbox/";

  /* ------------------------------------------------------------------------------------------------ */
  /*                                        Fetch fonctions                                          
  /* ------------------------------------------------------------------------------------------------ */

  async function getIso() {
    try {
      const response = await fetch(
        `${urlBase}cycling/${lat},${lng}?contours_minutes=${rangeValue}&polygons=true&access_token=${mapboxgl.accessToken}`,
        { method: "GET" }
      );
      const data = await response.json();
      map.current.getSource("iso").setData(data);
    } catch (err) {
      console.error(err);
    }
  }

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

  async function getOTM() {
    try {
      const response = await fetch(
        `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${arrival.lat}&lat=${arrival.lng}&kinds=interesting_places&format=json&apikey=${opentripmapAccessToken}`,
        { method: "GET" }
      );
      const data = await response.json();
      const point = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [data[0].point.lon, data[0].point.lat],
        },
        properties: {
          name: data[0].name,
        },
      };
      // otmPoints.features.push(point);
      map.current.getSource("OpenTripMap").setData(point);
    } catch (err) {
      console.error(err);
    }
  }

  /* ------------------------------------------------------------------------------------------------ */
  /*                                     Add map and sources                                           
  /* ------------------------------------------------------------------------------------------------ */
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

    map.current.on("load", () => {
      //  --------------create source iso --------------
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

      //  --------------create source route markers --------------
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

      //  --------------create source OpenTripMap --------------
      const otmPoints = {
        type: "FeatureCollection",
        features: [],
      };

      map.current.addSource("OpenTripMap", {
        type: "geojson",
        data: otmPoints,
      });

      map.current.addLayer({
        id: "OpenTripMap",
        type: "circle",
        source: "OpenTripMap",
        paint: {
          "circle-radius": 20,
          "circle-color": "#cc6552",
          "circle-opacity": 0.9,
        },
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ------------------------------------------------------------------------------------------------ */
  /*                                             Fly to                                              
  /* ------------------------------------------------------------------------------------------------ */

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

  /* ------------------------------------------------------------------------------------------------ */
  /*                                            IsoChrone                                              
  /* ------------------------------------------------------------------------------------------------ */

  useEffect(() => {
    if (departure.isChosen && arrival.isChosen) {
      getIso();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rangeValue, lat, lng]);

  /* ------------------------------------------------------------------------------------------------ */
  /*                                   Route and Opentrip Map                                            
  /* ------------------------------------------------------------------------------------------------ */

  useEffect(() => {
    if (departure.isChosen && arrival.isChosen) {
      // --------------- add route markers ---------------------

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

      // ----------- get route and OTM ----------

      getRoute();
      getOTM();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departure, arrival]);

  /* ------------------------------------------------------------------------------------------------ */
  /*                                        RETURN                                            
  /* ------------------------------------------------------------------------------------------------ */

  return (
    <strong className="no-cursor">
      <div ref={mapContainer} className="map" />
    </strong>
  );
}

export default Map3;

Map3.propTypes = {
  lng: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  pitch: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  isChosen: PropTypes.bool.isRequired,
  rangeValue: PropTypes.number.isRequired,
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
