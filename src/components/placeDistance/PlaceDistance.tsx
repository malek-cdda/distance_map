"use client";
import { use, useEffect } from "react";
import { declareMap } from "../map/map";

const PlaceDistance = () => {
  useEffect(() => {
    async function initMap() {
      const { map } = await declareMap("map");
      const startLocation = {
        lat: 45.4222931,
        lng: -75.6870167,
      };

      const endLocation = {
        lat: 45.4199184,
        lng: -75.710681,
      };
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();

      directionsService.route(
        {
          origin: startLocation,
          destination: endLocation,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        function (response: any, status: any) {
          if (status === google.maps.DirectionsStatus.OK) {
            const steps = response.routes[0].overview_path;

            console.log(steps);
            const marker = new google.maps.Marker({
              map: map,
              position: {
                lat: steps[0].lat(),
                lng: steps[0].lng(),
              },
              label: "🚘",
              zIndex: 1,
            });
            let i = 0;
            const interval = setInterval(function () {
              i++;
              if (i === steps.length) {
                clearInterval(interval);
                return;
              }

              marker.setPosition({
                lat: steps[i].lat(),
                lng: steps[i].lng(),
              });
            }, 1000);
            directionsRenderer.setDirections(response);
            directionsRenderer.setMap(map);
          }
        }
      );
    }
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, []);
  return (
    <div className="container mx-auto my-5">
      <div id="map" className="h-[400px]"></div>
    </div>
  );
};

export default PlaceDistance;
