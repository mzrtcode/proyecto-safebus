import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './layouts/Dashboard';
import Localidades from './pages/Localidades';
import Rutas  from './pages/Rutas';
import Conductores from './pages/Conductores';
import Propietarios from './pages/Propietarios';
import Vehiculos from './pages/Vehiculos';
import Agencias from './pages/Agencias';
import Vendedores from './pages/Vendedores';
import Ventas from './pages/Ventas';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import { localidadesLoader } from './api/localidades';
import { rutasLoader } from './api/rutas';
import { conductoresLoader } from './api/conductores';
import { propietariosLoader } from './api/propietarios';
import { vehiculosLoader } from './api/vehiculos';
import { agenciasLoader } from './api/agencias';
import { vendedoresLoader } from './api/vendedores';
import Planillaje from './pages/Planillaje';
import Administradores from './pages/Administradores';
import { administradoresLoader } from './api/administradores';
import { planillajeLoader } from './api/planillaje';
import path from 'path';
import Estadisticas from './pages/Estadisticas';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/> ,
    children: [
      {path: '/', element:  <Estadisticas/> },
     
    ]
  },

  {
    path: "/registros",
    element: <Dashboard/> ,
    children: [
      {path: 'localidades', element: <Localidades/>, loader: localidadesLoader},
      {path: 'localidades/:id', element: <Localidades/>, loader: localidadesLoader},
      {path: 'rutas', element: <Rutas/>, loader: rutasLoader },
      {path: 'rutas/:id', element: <Rutas/>, loader: rutasLoader },
      {path: 'conductores', element: <Conductores/>, loader: conductoresLoader},
      {path: 'conductores/:id', element: <Conductores/>, loader: conductoresLoader},
      {path: 'propietarios', element: <Propietarios/>, loader: propietariosLoader},
      {path: 'propietarios/:id', element: <Propietarios/>, loader: propietariosLoader},
      {path: 'vehiculos', element: <Vehiculos/>, loader: vehiculosLoader},
      {path: 'vehiculos/:id', element: <Vehiculos/>, loader: vehiculosLoader},
      {path: 'agencias', element: <Agencias/>, loader: agenciasLoader},
      {path: 'agencias/:id', element: <Agencias/>, loader: agenciasLoader},
      {path: 'vendedores', element: <Vendedores/>, loader: vendedoresLoader},
      {path: 'vendedores/:id', element: <Vendedores/>, loader: vendedoresLoader},
      {path: 'administradores', element: <Administradores/>, loader: administradoresLoader},
      {path: 'administradores/:id', element: <Administradores/>, loader: administradoresLoader},
      

     
    ]
  },

  {
    path: "/procesos",
    element: <Dashboard/> ,
    children: [
      {path: 'ventas', element: <Ventas/>, loader: planillajeLoader},
      {path: 'planillaje', element: <Planillaje/> },
    ]
  },

  {
    path: "/login",
    element: <LoginPage/>
  },

 
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
     <RouterProvider router={router} />
    <ToastContainer />
    </AuthProvider>
  </React.StrictMode>,
)
