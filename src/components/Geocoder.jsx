// import { useEffect } from "react";
// import mapboxgl from "mapbox-gl";

// export default function Geocoder() {
//   const handleChange = (result) => {
//     // setLocation(result);
//     setLatitude(result.center[0]);
//     setLongitude(result.center[1]);
//     setIsChosen(true);
//     setSearchBar(result.text);
//   };

//   useEffect(() => {
//     const geocoder = new MapboxGeocoder({
//       accessToken: mapboxgl.accessToken,
//       types: "country,region,place,postcode,locality,neighborhood",
//     });
//     geocoder.addTo("#geocoder");
//     geocoder.on("result", (e) => {
//       handleChange(e.result);
//     });
//     // Clear results container when search is cleared.
//     geocoder.on("clear", () => {});
//   }, []);

//   return <div>Geocoder</div>;
// }
