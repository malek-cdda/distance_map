import documentSlice from "./documents/documentSlice";

const { configureStore } = require("@reduxjs/toolkit");
const store = configureStore({
  reducer: {
    documentData: documentSlice,
  },
});
export default store;
