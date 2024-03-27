import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  mesesSinIntereses,
  setRedibujar,
  unaExhibicion,
} from "../../store/slices/registroBanamex";
import { writeBanamex1, writeBanamexMsi } from "../../store/slices/thunks";

export const RegistroBanamex = () => {
  const [concepto1, setConcepto1] = useState("");
  const [concepto2, setConcepto2] = useState("");
  const [cantidad1, setCantidad1] = useState("");
  const [cantidad2, setCantidad2] = useState("");
  const [numeroMeses, setNumeroMeses] = useState("");
  const { redibujar } = useSelector((state) => state.registroBanamex);
  const dispatch = useDispatch();

  const getConcepto1 = (event) => {
    setConcepto1(event.target.value);
  };

  const getCantidad1 = (event) => {
    setCantidad1(event.target.value);
  };

  const getConcepto2 = (event) => {
    setConcepto2(event.target.value);
  };

  const getCantidad2 = (event) => {
    setCantidad2(event.target.value);
  };

  const getNumeroMeses = (event) => {
    setNumeroMeses(event.target.value);
  };

  const registroUnaExhibicion = () => {
    dispatch(unaExhibicion({ concepto1: concepto1, cantidad1: cantidad1 }));
    dispatch(writeBanamex1());
    dispatch(setRedibujar({ redibujar: Number(redibujar) + 1 }));
    setConcepto1("");
    setCantidad1("");
    alert("Registro exitoso");
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th colSpan="2" id="titulo">
              Registrar nuevo gasto 1 exhibición
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Concepto:</td>
            <td>
              <input type="text" value={concepto1} onChange={getConcepto1} />
            </td>
          </tr>
          <tr>
            <td>Cantidad:</td>
            <td>
              <input type="number" value={cantidad1} onChange={getCantidad1} />
            </td>
          </tr>
          <tr>
            <button
              onClick={
                concepto1 != "" && cantidad1 != ""
                  ? registroUnaExhibicion
                  : null
              }
            >
              Registrar
            </button>
          </tr>
          <tr></tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th colSpan="2" id="titulo">
              Registrar nuevo gasto A MSI
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Concepto:</td>
            <td>
              <input type="text" value={concepto2} onChange={getConcepto2} />
            </td>
          </tr>
          <tr>
            <td>Cantidad:</td>
            <td>
              <input type="number" value={cantidad2} onChange={getCantidad2} />
            </td>
          </tr>
          <tr>
            <td># meses:</td>
            <td>
              <input
                type="number"
                value={numeroMeses}
                onChange={getNumeroMeses}
              />
            </td>
          </tr>
          <tr>
            <button
              onClick={
                concepto2 != "" && cantidad2 != "" && numeroMeses != ""
                  ? () => {
                      dispatch(
                        mesesSinIntereses({
                          concepto2: concepto2,
                          cantidad2: cantidad2,
                          numeroMeses: numeroMeses,
                        })
                      );
                      dispatch(writeBanamexMsi());
                      dispatch(
                        setRedibujar({ redibujar: Number(redibujar) + 1 })
                      );
                      setCantidad2("");
                      setConcepto2("");
                      setNumeroMeses("");
                      alert("Registro exitoso");
                    }
                  : null
              }
            >
              Registrar
            </button>
          </tr>
        </tbody>
      </table>
    </>
  );
};
