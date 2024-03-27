import { configureStore } from "@reduxjs/toolkit";
import { generalesSlice } from "./slices/generalesSlice";
import { getMsiSlice } from "./slices/banamexSlice";
import { registroBanamexSlice } from "./slices/registroBanamex";

export const store = configureStore({
  reducer: {
    generales: generalesSlice.reducer,
    getMsi: getMsiSlice.reducer,
    registroBanamex: registroBanamexSlice.reducer,
  },
});
