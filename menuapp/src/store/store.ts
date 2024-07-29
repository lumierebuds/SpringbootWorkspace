import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "../features/menuSlice";

let store = configureStore({
  reducer: {
    menus: menuSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
