/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import {
  setConceptosBanamex,
  setMensualidad,
  setConceptosBanamexProcesados,
  setTotalTemporal1,
} from "../store/slices/banamexSlice";
import { useEffect, useState } from "react";
import { getMsi, writeTotalBanamex } from "../store/slices/thunks";
import { RegistroBanamex } from "./components/RegistroBanamex";
import { setRedibujar } from "../store/slices/registroBanamex";
import { seleccionQuincenaMes } from "../store/slices/generalesSlice";
import { useNavigate } from "react-router-dom";

export const BanamexPage = () => {
  const { conceptosBanamex, conceptosBanamexProcesados, mensualidad } =
    useSelector((state) => state.getMsi);
  const { quincena } = useSelector((state) => state.generales);
  const { redibujar } = useSelector((state) => state.registroBanamex);

  const dispatch = useDispatch();
  const [mensualidadPagar, setMensualidadPagar] = useState([]);
  const [newConcept, setNewConcept] = useState([]);
  const [suma, setSuma] = useState(0);
  const navigate = useNavigate();

  let quin;
  let mes;
  //Funciones***************************************************
  switch (quincena) {
    case "1Enero":
      quin = 1;
      break;
    case "2Enero":
      quin = 2;
      break;
    case "1Febrero":
      quin = 3;
      break;
    case "2Febrero":
      quin = 4;
      break;
    case "1Marzo":
      quin = 5;
      break;
    case "2Marzo":
      quin = 6;
      break;
    case "1Abril":
      quin = 7;
      break;
    case "2Abril":
      quin = 8;
      break;
    case "1Mayo":
      quin = 9;
      break;
    case "2Mayo":
      quin = 10;
      break;
    case "1Junio":
      quin = 11;
      break;
    case "2Junio":
      quin = 12;
      break;
    case "1Julio":
      quin = 13;
      break;
    case "2Julio":
      quin = 14;
      break;
    case "1Agosto":
      quin = 15;
      break;
    case "2Agosto":
      quin = 16;
      break;
    case "1Septiembre":
      quin = 17;
      break;
    case "2Septiembre":
      quin = 18;
      break;
    case "1Octubre":
      quin = 19;
      break;
    case "2Octubre":
      quin = 20;
      break;
    case "1Noviembre":
      quin = 21;
      break;
    case "2Noviembre":
      quin = 22;
      break;
    case "1Diciembre":
      quin = 23;
      break;
    case "2Diciembre":
      quin = 24;
      break;
    default:
      // Valor predeterminado si no coincide con ninguna quincena conocida
      quin = 0;
  }
  const calcularPagoMsi = () => {
    const mensualidades = Object.entries(conceptosBanamex).map(
      ([, cantidad]) => {
        const result = cantidad[2] / cantidad[3];
        return result.toFixed(2);
      }
    );
    setMensualidadPagar(mensualidades);
  };

  let apareceMsi = false;
  let qRegistro, restantes, debo, quinAMes;

  const calculoMes = () => {
    const nuevoConceptos = Object.entries(conceptosBanamex).map(([, mesD]) => {
      const msi = mesD[0];
      const concepto = mesD[1];
      const cantidad = mesD[2];
      const aCuantosMeses = mesD[3];
      const compradoEn = `Q${mesD[5].replace(/(\d+)([a-zA-Z]+)/, "$1º- $2")}`;

      if (mesD[4] % 2 === 0) {
        qRegistro = Math.floor((mesD[4] + 1) / 2) + 2;
      } else {
        qRegistro = Math.floor(mesD[4] / 2) + 2;
      }

      /*  if (quin % 2 === 0 && mesD[3] >= 2) {
        quinAMes = 
      } */

      if (quin % 2 === 0 /* && mesD[3] >= 2 */) {
        quinAMes = Math.floor((quin + 1) / 2) + 1;
      
        restantes = quinAMes - qRegistro + 1;
        /* console.log(`qRegistro para TRABAJAR ${qRegistro} quin ${quin}`); */
      } else if (quin % 2 != 0 /* && mesD[3] >= 2 */) {
        quinAMes = Math.floor(quin / 2) + 1;

        restantes = quinAMes - qRegistro + 1;
      } else {
        restantes = 1;
      }

      //debo = mesD2 Total    mesD2/mesD3 parcialidades
      if (mesD[3] >= 2) {
        debo = mesD[2] - (mesD[2] / mesD[3]) * restantes + mesD[2] / mesD[3];
        if (debo % 1 != 0) {
          debo = debo.toFixed(2);
        }
      } else {
        debo = mesD[2];
      }

      if (quinAMes >= qRegistro && quinAMes + 1 <= qRegistro + mesD[3]) {
        apareceMsi = true;
      } else {
        apareceMsi = false;
      }
      return [
        msi,//0
        concepto,//1
        cantidad,//2
        aCuantosMeses,//3
        qRegistro,//4
        apareceMsi,//5
        restantes,//6
        debo,//7
        compradoEn,//8
      ];
    });

    setNewConcept(nuevoConceptos);
  };

  const calculoTotal = () => {
    let arrayTotal = new Array();
    arrayTotal = Object.entries(conceptosBanamexProcesados).map(
      ([index, concepto], indice1) => {
        if (
          concepto[4] === quinAMes ||
          /* concepto[4] === quinAMes || */
          concepto[5] === true
        ) {
          const ms = Number(mensualidad[indice1]);
          return ms;
        } else {
          return null; // Si no se cumple la condición, retornamos null para no renderizar nada
        }
      }
    );

    setSuma(
      arrayTotal.reduce(
        (acumulador, valorActual) => acumulador + valorActual,
        0
      )
    );
    dispatch(setTotalTemporal1(suma));
  };

  const enviarTotal = () => {
    dispatch(writeTotalBanamex());
  };

  const aInicio = () => {
    navigate("/inicio");
  };

  const aGenerales = () => {
    navigate("/generales");
  };
  //Efectos*********************************************************
  useEffect(() => {
    const qMes = localStorage.getItem("mesG");
    dispatch(seleccionQuincenaMes(qMes));
  }, []);

  useEffect(() => {
    dispatch(getMsi()); //Escribe conceptosBanamex del thunks
  }, [dispatch, redibujar]);

  useEffect(() => {
    calcularPagoMsi();
  }, [conceptosBanamex]);

  useEffect(() => {
    calculoMes();
  }, [conceptosBanamex, redibujar]);

  useEffect(() => {
    calculoTotal();
  });

  useEffect(() => {
    dispatch(setMensualidad({ mensualidad: mensualidadPagar }));
  }, [mensualidadPagar, redibujar]);

  useEffect(() => {
    dispatch(
      setConceptosBanamexProcesados({ conceptosBanamexProcesados: newConcept })
    );
  }, [newConcept, redibujar]);

  /* useEffect(() => {
    console.log(apareceMsi);
  }, [newConcept]); */

  /* useEffect(() => {
    console.log(`Conceptos Banamex ${conceptosBanamex}`);
    console.log(`Conceptos Procesados ${conceptosBanamexProcesados}`);
  }, [conceptosBanamex, conceptosBanamexProcesados]); */

  return (
    <>
      <h3>Banamex</h3>
      <h3>{`Quincena: ${quincena.replace(/(\d+)([a-zA-Z]+)/, "$1º $2")}`}</h3>
      <table>
        <thead>
          <tr>
            <th>Concepto</th>
            <th>Cantidad</th>
            <th>MSI</th>
            <th>Comprado</th>
            <th>Debo</th>
            <th>A pagar</th>
            <th>Mes a Pagar</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(conceptosBanamexProcesados).map(
            ([index, concepto], indice1) => {
              if (
                concepto[4] === quinAMes ||
                /* concepto[4] === quin - 1 || */
                concepto[5] === true
              ) {
                return (
                  <tr key={index}>
                    <td>{concepto[1]}</td>
                    <td className="centrado">{`$${concepto[2]}`}</td>
                    <td className="centrado">{concepto[3]}</td>
                    <td>{concepto[8]}</td>
                    <td className="centrado">{`$${concepto[7]}`}</td>
                    <td className="centrado">{`$${mensualidad[indice1]}`}</td>
                    <td className="centrado">{`${concepto[6]}`}</td>
                  </tr>
                );
              } else {
                return null; // Si no se cumple la condición, retornamos null para no renderizar nada
              }
            }
          )}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="total">Total</td>
            <td className="total">{`$ ${suma}`}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <RegistroBanamex />
      {/* <div>mensualidad del slice {mensualidad}</div> */}
      <button
        onClick={() => {
          enviarTotal();
          alert("Se envió exitosamente");
          aGenerales();
        }}
      >
        Enviar a Base
      </button>
      <br />
      <button className="navegacion" onClick={aInicio}>
        Selección de mes
      </button>
      <button className="navegacion" onClick={aGenerales}>
        Gastos generales
      </button>
    </>
  );
};
