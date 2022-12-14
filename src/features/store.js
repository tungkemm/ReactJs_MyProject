import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./slices/accountSlice";
import musicplayerSlice from "./slices/musicplayerSlice";
import workSlice from "./slices/workSlice";

export const store = configureStore({
  reducer: {
    account: accountSlice,
    work: workSlice,
    musicplayer: musicplayerSlice,
  },
});
