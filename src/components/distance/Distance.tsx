import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Distance = () => {
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const [placeId, setPlaceId] = useState("");
  const [distance, setDistance] = useState("");
  useEffect(() => {
    let map;

    function initMap() {
      map = new google.maps.Map(document.getElementById("map") as any, {
        center: navigator?.geolocation
          ? { lat: 37.7749, lng: -122.4194 }
          : { lat: 37.7749, lng: -122.4194 },
        zoom: 12,
      });

      let directionsService = new google.maps.DirectionsService();
      let directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      function calculateAndDisplayRoute(start: any, end: any) {
        directionsService.route(
          {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          function (response: any, status: any) {
            if (status === "OK") {
              setDistance(response?.routes[0]?.legs[0]?.distance?.text);
              directionsRenderer.setDirections(response);
            } else {
              window.alert("Directions request failed due to " + status);
            }
          }
        );
      }
      let startLocation; // Example coordinates for San Francisco
      let endLocation; // Example coordinates for Oakland
      const input = document.getElementById("pac-input") as HTMLInputElement;

      const options = {
        fields: ["address_components", "geometry", "icon", "name", "place_id"],
        strictBounds: false,
      };
      // find place library  = autcomplete
      const autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.bindTo("bounds", map);
      autocomplete.addListener("place_changed", () => {
        const place: any = autocomplete.getPlace();
        if (!place?.geometry?.location) {
          window.alert("wrong address");
          return place;
        }
        if (navigator?.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position.coords.latitude, position.coords.longitude);
            startLocation = new google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );
            endLocation = new google.maps.LatLng(
              place.geometry.location.lat(),
              place.geometry.location.lng()
            );
            console.log(startLocation);
            calculateAndDisplayRoute(startLocation, endLocation);
          });
        }
      });
    }
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, []);
  const state = useSelector((state: any) => state.documentData.documentData);
  useEffect(() => {
    console.log(placeId);
    state.map((item: any) => {
      if (item?.placeId === placeId) {
        alert(item?.name);
      }
    });
  }, [latLng, placeId, state]);
  console.log(state);
  return (
    <>
      <div id="map" className="h-96"></div>
      <div className="flex justify-center my-5  flex-col items-center ">
        <label className="capitalize  w-3/4 px-2 ">distanation </label>
        <input
          id="pac-input"
          className="border rounded-xl px-5 py-2 w-3/4 focus:outline-none focus:rounded-t-xl focus:rounded-none"
          placeholder="enter your city"
        />
      </div>
      <h1 className="text-center"> City Distance {distance}</h1>
    </>
  );
};
export default Distance;
