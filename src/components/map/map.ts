export const declareMap = async (maps: any) => {
  const map = new google.maps.Map(document.getElementById("map") as any, {
    center: {
      lat: 45.4222931,
      lng: -75.6870167,
    },
    zoom: 13,
  });
  return {
    map,
  };
};
