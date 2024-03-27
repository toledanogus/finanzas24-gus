/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getConceptos,
  getTotalBanamex,
  sendPagados,
} from "../store/slices/thunks";
import {
  seleccionQuincenaMes,
  setPagados,
  setTotalTemporal2,
} from "../store/slices/generalesSlice";
import { useFetch } from "../hooks/useFetch";
import { RegistrarGasto } from "./components/RegistrarGasto";
import { useNavigate } from "react-router-dom";

export const GeneralesPage = () => {
  const { quincena, conceptos, pagados, redibujar, totalTemporal2 } =
    useSelector((state) => state.generales);
  const dispatch = useDispatch();
  const [checkedItems, setCheckedItems] = useState(new Set());
  //const [total1, setTotal1] = useState(0);
  const [total2, setTotal2] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [datosCargados, setDatosCargados] = useState(false);
  const [mesLocalStorage, setMesLocalStorage] = useState("1Enero");
  const [url, setUrl] = useState("./php/test.php");
  const { data, hasError, isLoading } = useFetch(url);
  const navigate = useNavigate();
  const [quincenaOk, setQuincenaOk] = useState("");

  /* FUNCIONES**************************************************************** */

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setCheckedItems(
        (prevCheckedItems) => new Set(prevCheckedItems.add(name))
      );
    } else {
      const newCheckedItems = new Set(checkedItems);
      newCheckedItems.delete(name);
      setCheckedItems(newCheckedItems);
    }
  };

  /* const CambiarUrl = () => {
    setUrl("./php/test2.php");
  }; */

  const sumarTotal2 = () => {
    // eslint-disable-next-line no-unused-vars
    const suma = conceptos.reduce((total, [, cantidad, pagado]) => {
      if (pagado === 0) {
        return total + cantidad;
      }
      return total;
    }, 0);
    setTotal2(suma);
  };

  const enviarPagados = async () => {
    await dispatch(setPagados({ pagados: Array.from(checkedItems) }));
    await dispatch(sendPagados());
    setDatosCargados(false);
  };

  const aBanamex = () => {
    navigate("/banamex");
  };

  const aInicio = () => {
    navigate("/inicio");
  };

  const aGenerales = () => {
    navigate("/generales");
  };

  /* EFECTOS *******************************************************/
  useEffect(() => {
    const qMes = localStorage.getItem("mesG");
    dispatch(seleccionQuincenaMes(qMes));
  }, []);

  useEffect(() => {
    if (conceptos !== 1) {
      sumarTotal2();
    }
  }, [conceptos]);

  useEffect(() => {
    setMesLocalStorage(quincena);
  }, []);

  useEffect(() => {
    dispatch(getConceptos());
  }, [checkedItems, redibujar]);

  useEffect(() => {
    dispatch(getTotalBanamex());
  }, []);

  useEffect(() => {
    setQuincenaOk(quincena);
  }, []);

  return (
    <>
      <h3>{`Quincena: ${quincena.replace(/(\d+)([a-zA-Z]+)/, "$1º $2")}`}</h3>
      <table>
        <thead>
          <tr>
            <th colSpan="4" id="titulo" className="titulotabla">
              Gastos permanentes
            </th>
          </tr>
          <tr>
            <th>Concepto</th>
            <th>Cantidad</th>
            <th>Pagado</th>
            <th>Estatus</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(conceptos).map(([index, concepto]) => (
            <tr key={index}>
              <td>{concepto[0]}</td>
              <td>
                {concepto[1] && concepto[1]
                  ? `$${concepto[1].toLocaleString()}`
                  : "—"}
              </td>
              <td>
                {concepto[2] === 0 ? (
                  <input
                    name={concepto[0]} // Cambiado a concepto[0]
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={checkedItems.has(concepto[0])} // Nuevo
                  />
                ) : null}
              </td>
              <td>
                {concepto[2] ? <span className="arrow">✓</span> : "No pagado"}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="total">Total</td>
            <td className="total">
              {total2 && total2 ? `$${total2.toLocaleString()}` : null}
            </td>
          </tr>
          <tr>
            <td>
              <button
                onClick={() => {
                  enviarPagados().then(() => dispatch(getConceptos()));
                }}
              >
                Registrar Pagos
              </button>
            </td>
          </tr>
        </tfoot>
      </table>

      <table>
        <thead>
          <tr>
            <th colSpan="4">Tarjeta Banamex</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <button onClick={aBanamex}>Banamex</button>{" "}
            </td>
            <td className="banamextotal">
              {totalTemporal2 && totalTemporal2
                ? `$${totalTemporal2.toLocaleString()}`
                : null}
            </td>
          </tr>
        </tbody>
      </table>
      {/*  <div>{pagados && pagados}</div>
      <h2>{data}</h2> */}
      {/* <button onClick={CambiarUrl}>CambiarUrl</button> */}
      <RegistrarGasto />
      {/*  <div>{redibujar}</div>
      <button onClick={aBanamex}>A Banamex</button> */}

      <button className="navegacion" onClick={aInicio}>
        Selección de mes
      </button>
      <button className="navegacion" onClick={aBanamex}>
        Tarjeta Banamex
      </button>
    </>
  );
};
