import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function MyMap({ mapNumber, lat, lng, zoom, pitch, isChosen, route }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [geojson, setGeojson] = useState({
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [],
    },
  });

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

  // ---------------------------------------- Route----------------------------------------

  useEffect(() => {
    map.current.on("load", () => {
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

      getRoute();
    });

    async function getRoute() {
      await fetch(
        "https://api.mapbox.com/directions/v5/mapbox/cycling/2,48;2,45?geometries=geojson&overview=full&steps=true&access_token=pk.eyJ1IjoidGhvbWFzbG9uam9uIiwiYSI6ImNsaThwNTFnYzFsd3ozZnBjczN3aDlhYzcifQ.na2-On5k8L1PUKU8Em_-Ew"
      )
        .then((response) => response.json())
        .then((data) => {
          map.current.getSource("route").setData({
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: data.routes[0].geometry.coordinates,
            },
          });
        })
        .catch((err) => console.error(err));
    }
  }, []);
  // -----------------------------------------------
  // useEffect(() => {
  //   // if (mapNumber === 3) {
  //   // map.current.addControl(
  //   //   new MapboxDirections({
  //   //     accessToken: mapboxgl.accessToken,
  //   //   }),
  //   //   "top-left"
  //   // );

  //   const geojson = {
  //     type: "Feature",
  //     properties: {},
  //     geometry: {
  //       type: "LineString",
  //       coordinates: [
  //         [-122.483696, 37.833818],
  //         [-122.483482, 37.833174],
  //         [-122.483396, 37.8327],
  //         [-122.483568, 37.832056],
  //         [-122.48404, 37.831141],
  //         [-122.48404, 37.830497],
  //         [-122.483482, 37.82992],
  //         [-122.483568, 37.829548],
  //         [-122.48507, 37.829446],
  //         [-122.4861, 37.828802],
  //         [-122.486958, 37.82931],
  //         [-122.487001, 37.830802],
  //         [-122.487516, 37.831683],
  //         [-122.488031, 37.832158],
  //         [-122.488889, 37.832971],
  //         [-122.489876, 37.832632],
  //         [-122.490434, 37.832937],
  //         [-122.49125, 37.832429],
  //         [-122.491636, 37.832564],
  //         [-122.492237, 37.833378],
  //         [-122.493782, 37.833683],
  //       ],
  //     },
  //   };

  //   console.log(geojson);

  //   map.current.on("load", () => {
  //     console.log("rendered");
  //     if (map.current.getSource("route")) {
  //       map.current.getSource("route").setData(geojson);
  //     } else {
  //       map.current.addLayer({
  //         id: "route",
  //         type: "line",
  //         source: {
  //           type: "geojson",
  //           data: geojson,
  //         },
  //         layout: {
  //           "line-join": "round",
  //           "line-cap": "round",
  //         },
  //         paint: {
  //           "line-color": "#3887be",
  //           "line-width": 50,
  //           "line-opacity": 0.75,
  //         },
  //       });
  //     }
  //   });
  // });

  // useEffect(() => {
  //   const geojson = {
  //     type: "Feature",
  //     properties: {},
  //     geometry: {
  //       type: "LineString",
  //       coordinates: route,
  //     },
  //   };

  //   if (map.current.getSource("route")) {
  //     map.current.getSource("route").setData(geojson);
  //   }
  // }, [route]);

  // ---------------------------------------- RETURN----------------------------------------

  return (
    <strong className="no-cursor">
      <div ref={mapContainer} className="map" />
    </strong>
  );
}

export default MyMap;

MyMap.propTypes = {
  lng: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  pitch: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  isChosen: PropTypes.bool.isRequired,
};
