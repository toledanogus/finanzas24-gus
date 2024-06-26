import { Navigate, Route, Routes } from "react-router-dom";
import { InicioPage } from "../pages/InicioPage";
import { GeneralesPage } from "../pages/GeneralesPage";
import { BanamexPage } from "../pages/BanamexPage";
import { SimuladorPage } from "../pages/SimuladorPage";


export const AppRouter = () => {
  return (
    <Routes>
        <Route path="inicio" element={<InicioPage />}/>
        <Route path="generales" element={<GeneralesPage />}/>
        <Route path="banamex" element={<BanamexPage />}/>
        <Route path="simulador" element={<SimuladorPage />}/>
        <Route path="/" element={<Navigate to = "Inicio" />}/>
    </Routes>
  )
}
