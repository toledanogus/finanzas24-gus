import {
  selectPagados,
  selectQuincena,
  setConceptos,
  setTotalTemporal2,
} from "./generalesSlice";
import {
  selectTotalTemporal1,
  setConceptosBanamex,
  setTotalTemporal1,
} from "./banamexSlice";
import { banamexApi } from "../../api/banamexApi";
import {
  selectCantidad1,
  selectCantidad2,
  selectConcepto1,
  selectConcepto2,
  selectNumeroMeses,
  unaExhibicion,
} from "./registroBanamex";
import { registroBanamexApi } from "../../api/registroBanamexApi";

export const getConceptos = () => {
  // eslint-disable-next-line no-unused-vars
  return async (dispatch, getState) => {
    const quincena = selectQuincena(getState());
    const jsonQuincena = { quincena };

    const resp = await fetch("./php/recibirConceptos.php", {
      method: "POST",
      body: JSON.stringify(jsonQuincena),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();

    dispatch(setConceptos({ conceptos: data }));
  };
};

export const sendPagados = () => {
  return async (dispatch, getState) => {
    const pagados = selectPagados(getState());
    const quincena = selectQuincena(getState());
    const unidos = {
      objetoPagados: { pagados },
      objetoQuincena: { quincena },
    };
    /* const jsonPagados = { pagados };
    console.log(jsonPagados); */

    // eslint-disable-next-line no-unused-vars
    const resp = await fetch("./php/enviarPagados.php", {
      method: "POST",
      body: JSON.stringify(unidos),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};

/* export const getMsi = () => {
  return async (dispatch, getState) => {
    const quincena2 = selectQuincena(getState());
    let jsonQuincena2 = new Object();
    jsonQuincena2['quincena']=quincena2;
    console.log(`Quincena actual ${JSON.stringify(jsonQuincena2)}`);
    

    const resp = await fetch("./php/recibirMsi.php", {
      method: "POST",
      body: JSON.stringify(jsonQuincena2),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    console.log(`Data como viene del JSON ${data}`);
    
    dispatch(setConceptosBanamex({ conceptosBanamex: data }));
  }; 
};*/

export const getMsi = () => {
  return async (dispatch, getState) => {
    const quincena2 = selectQuincena(getState());
    let jsonQuincena2 = new Object();
    jsonQuincena2["quincena"] = quincena2;

    const { data } = await banamexApi.post(`/recibirMsi.php`, jsonQuincena2);

    dispatch(setConceptosBanamex({ conceptosBanamex: data }));
  };
};

export const writeBanamex1 = () => {
  return async (dispatch, getState) => {
    const con1 = selectConcepto1(getState());
    const can1 = selectCantidad1(getState());
    const quin = selectQuincena(getState());
    let jsonUnaExhibicion = new Object();
    jsonUnaExhibicion["newConcept"] = con1;
    jsonUnaExhibicion["newValue"] = can1;
    jsonUnaExhibicion["quincena"] = quin;

    const { data } = await registroBanamexApi.post(
      `/registrarBanamex.php`,
      jsonUnaExhibicion
    );
  };
};

export const writeBanamexMsi = () => {
  return async (dispatch, getState) => {
    const con2 = selectConcepto2(getState());
    const can2 = selectCantidad2(getState());
    const quin = selectQuincena(getState());
    const aMeses = selectNumeroMeses(getState());
    let jsonMsi = new Object();
    jsonMsi["newConcept"] = con2;
    jsonMsi["newValue"] = can2;
    jsonMsi["quincena"] = quin;
    jsonMsi["aMeses"] = aMeses;

    const { data } = await registroBanamexApi.post(
      `/registrarBanamexMsi.php`,
      jsonMsi
    );
  };
};

export const writeTotalBanamex = () => {
  return async (dispatch, getState) => {
    const quantity = selectTotalTemporal1(getState());

    const quin = selectQuincena(getState());

    let jsonwtb = new Object();
    jsonwtb["cantidad"] = quantity;
    jsonwtb["quincena"] = quin;

    const { data } = await registroBanamexApi.post(
      `/registrarTotal.php`,
      jsonwtb
    );
  };
};

export const getTotalBanamex = () => {
  return async (dispatch, getState) => {
    const quin = selectQuincena(getState());

    let jsonwtb = new Object();
    jsonwtb["quincena"] = quin;

    const { data } = await registroBanamexApi.post(
      `/getTotalBanamex.php`,
      jsonwtb
    );

    dispatch(setTotalTemporal2(data));
  };
};
