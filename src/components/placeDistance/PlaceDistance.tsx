"use client";
import { use, useEffect, useState } from "react";
import { declareMap } from "../map/map";

const PlaceDistance = () => {
  const [distance, setDistance] = useState("");
  useEffect(() => {
    async function initMap() {
      const { map } = await declareMap("map");
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
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
            directionsService.route(
              {
                origin: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
                destination: {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                },
                travelMode: google.maps.TravelMode.DRIVING,
              },
              function (response: any, status: any) {
                if (status === google.maps.DirectionsStatus.OK) {
                  const steps = response.routes[0].overview_path;
                  console.log(steps);
                  setDistance(response.routes[0]?.legs[0]?.distance?.text);
                  const marker = new google.maps.Marker({
                    map: map,
                    position: {
                      lat: steps[0].lat(),
                      lng: steps[0].lng(),
                    },
                    label: "🛒",
                    zIndex: 1,
                  });
                  let i = 0;
                  const interval = setInterval(function () {
                    i++;
                    if (i === steps.length) {
                      clearInterval(interval);
                      return;
                    }

                    // setDistance(step.distance.text);
                    marker.setPosition({
                      lat: steps[i]?.lat(),
                      lng: steps[i]?.lng(),
                    });
                  }, 100);
                  directionsRenderer.setDirections(response);
                  directionsRenderer.setMap(map);
                }
              }
            );
          });
        }
      });
    }
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, []);
  return (
    <div className="container mx-auto relative">
      <div id="map" className="h-96"></div>
      <div className="flex justify-center my-5  flex-col items-center absolute -top-4 left-1/2 transform -translate-x-1/2 w-1/2">
        {/* <label className="capitalize  w-full px-2 ">destination </label> */}
        <input
          id="pac-input"
          className="border rounded-xl px-5 py-2 w-full focus:outline-none focus:rounded-t-xl focus:rounded-none"
          placeholder="enter your Destination city"
        />
      </div>
      <h1 className="text-center"> City Distance {distance} </h1>
    </div>
  );
};

export default PlaceDistance;
