import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Distance = () => {
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const [placeId, setPlaceId] = useState("");
  useEffect(() => {
    let map;

    function initMap() {
      map = new google.maps.Map(document.getElementById("map") as any, {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 12,
      });
      map.addListener("click", (e: any) => {
        console.log(e.latLng.lat(), e.latLng.lng());
        setLatLng({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          { location: { lat: e.latLng.lat(), lng: e.latLng.lng() } },
          function (results: any, status: any) {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                setPlaceId(results[1].place_id);
              } else {
                window.alert("No results found");
              }
            } else {
              window.alert("Geocoder failed due to: " + status);
            }
          }
        );
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
          function (response, status) {
            if (status === "OK") {
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
      <input id="pac-input" />
    </>
  );
};
export default Distance;
