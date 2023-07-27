import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './layouts/Dashboard';
import Localidades, { localidadesLoader } from './pages/Localidades';
import Rutas, { rutasLoader } from './pages/Rutas';
import Conductores from './pages/Conductores';
import Propietarios from './pages/Propietarios';
import Vehiculos from './pages/Vehiculos';
import Agencias from './pages/Agencias';
import Vendedores from './pages/Vendedores';
import Ventas from './pages/Ventas';
import Card from './components/Card';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/> ,
    children: [
      {path: '/', element: <Card><h2>🚧 Dashboard en proceso 🚧 <br />🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆</h2></Card> },
     
    ]
  },

  {
    path: "/registros",
    element: <Dashboard/> ,
    children: [
      {path: 'localidades', element: <Localidades/>, loader: localidadesLoader},
      {path: 'rutas', element: <Rutas/>, loader: rutasLoader },
      {path: 'conductores', element: <Conductores/>},
      {path: 'propietarios', element: <Propietarios/>},
      {path: 'vehiculos', element: <Vehiculos/>},
      {path: 'agencias', element: <Agencias/>},
      {path: 'vendedores', element: <Vendedores/>},

     
    ]
  },

  {
    path: "/procesos",
    element: <Dashboard/> ,
    children: [
      {path: 'ventas', element: <Ventas/> },    
    ]
  },

  {
    path: "/login",
    element: <LoginPage/>
  }

 
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
     <RouterProvider router={router} />
    <ToastContainer />
    </AuthProvider>
  </React.StrictMode>,
)
