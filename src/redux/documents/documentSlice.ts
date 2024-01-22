import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documentData: [
    {
      name: "dhaka bangladesh",
      placeId: "ChIJMzySEISAhYARhojetVrJdWY",
      position: {
        lat: 23.8103,
        lng: 90.4125,
      },
      document: [
        {
          name: "dhaka",
          url: "https://www.youtube.com/watch?v=2GfZl4kuVNI",
        },
      ],
    },
    {
      name: "dhaka bangladesh for toukir vai",
      placeId: "ChIJd1V3GISAhYARscG8dnknInQ",
      position: {
        lat: 23.8103,
        lng: 90.4125,
      },
      document: [
        {
          name: "dhaka",
          url: "https://www.youtube.com/watch?v=2GfZl4kuVNI",
        },
      ],
    },
  ],
};

const documentSlice = createSlice({
  name: "documentData",
  initialState,
  reducers: {
    documentData: (state, action) => {
      console.log(state, action);
    },
  },
});
export const { documentData } = documentSlice.actions;
export default documentSlice.reducer;
