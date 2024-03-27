import { createSelector, createSlice } from "@reduxjs/toolkit";

const selectGetMsi = (state) => state.getMsi;

export const selectTotalTemporal1 = createSelector(
  [selectGetMsi],
  (getMsi) => getMsi.totalTemporal1
);

export const getMsiSlice = createSlice({
  name: "getMsi",
  initialState: {
    conceptosBanamex: [],
    conceptosBanamexProcesados: [],
    mensualidad: [],
    totalTemporal1: "",
  },
  reducers: {
    setConceptosBanamex: (state, action) => {
      state.conceptosBanamex = action.payload.conceptosBanamex;
    },
    setMensualidad: (state, action) => {
      state.mensualidad = action.payload.mensualidad;
    },
    setConceptosBanamexProcesados: (state, action) => {
      state.conceptosBanamexProcesados =
        action.payload.conceptosBanamexProcesados;
    },
    setTotalTemporal1: (state, action) => {
      state.totalTemporal1 = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  setConceptosBanamex,
  setMensualidad,
  setConceptosBanamexProcesados,
  setTotalTemporal1,
} = getMsiSlice.actions;
