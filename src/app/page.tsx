"use client";

import { init } from "next/dist/compiled/webpack/webpack";
import { useEffect } from "react";
let map: google.maps.Map, infoWindow: google.maps.InfoWindow;

export default function Home() {
  useEffect(() => {
    function initMap() {
      map = new google.maps.Map(document.getElementById("map") as any, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
      const geocoder = new google.maps.Geocoder();
      infoWindow = new google.maps.InfoWindow();

      const locationButton = document.createElement("button");
      locationButton.textContent = "Pan to Current Location";
      locationButton.classList.add("custom-map-control-button");
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
      locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              infoWindow.setPosition(pos);
              infoWindow.setContent("Location found.");
              infoWindow.open(map);
              map.setCenter(pos);
            },
            () => {
              handleLocationError(true, infoWindow, map.getCenter()!);
            }
          );
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter()!);
        }
      });
    }
    function handleLocationError(
      browserHasGeolocation: boolean,
      infoWindow: google.maps.InfoWindow,
      pos: google.maps.LatLng
    ) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }
    // start map
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, []);

  return (
    <div>
      <div id="map" className="h-96"></div>
    </div>
  );
}
