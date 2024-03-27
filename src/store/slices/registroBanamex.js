import { createSelector, createSlice } from "@reduxjs/toolkit";

const selectRegistroBanamex = (state) => state.registroBanamex;

export const selectConcepto1 = createSelector(
  [selectRegistroBanamex],
  (registroBanamex) => registroBanamex.concepto1
);

export const selectConcepto2 = createSelector(
  [selectRegistroBanamex],
  (registroBanamex) => registroBanamex.concepto2
);

export const selectCantidad1 = createSelector(
  [selectRegistroBanamex],
  (registroBanamex) => registroBanamex.cantidad1
);
export const selectCantidad2 = createSelector(
  [selectRegistroBanamex],
  (registroBanamex) => registroBanamex.cantidad2
);

export const selectNumeroMeses = createSelector(
  [selectRegistroBanamex],
  (registroBanamex) => registroBanamex.numeroMeses
);

export const registroBanamexSlice = createSlice({
  name: "registroBanamex",
  initialState: {
    concepto1: "",
    concepto2: "",
    cantidad1: "",
    cantidad2: "",
    numeroMeses: "",
    redibujar: [0],
  },
  reducers: {
    unaExhibicion: (state, action) => {
      state.concepto1 = action.payload.concepto1;
      state.cantidad1 = action.payload.cantidad1;
    },
    mesesSinIntereses: (state, action) => {
      state.concepto2 = action.payload.concepto2;
      state.cantidad2 = action.payload.cantidad2;
      state.numeroMeses = action.payload.numeroMeses;
    },
    setRedibujar: (state, action) => {
      state.redibujar = action.payload.redibujar;
    },
  },
});
// Action creators are generated for each case reducer function
export const { unaExhibicion, mesesSinIntereses, setRedibujar } =
  registroBanamexSlice.actions;
