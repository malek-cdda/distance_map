const { configureStore } = require("@reduxjs/toolkit");
const store = configureStore({
  reducer: {
    tableData: {
      name: "tableData",
    },
  },
});
export default store;
