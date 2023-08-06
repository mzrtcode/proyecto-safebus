import axios from './axios';

interface RutasTypes {
    id_ruta: number
    inicio_ruta: string
    fin_ruta: string
    estado: boolean
    costo: number
  }


export const rutasLoader = async (): Promise<RutasTypes[]> => {
    try {
      const res = await axios.get("/rutas");
      if (res.status !== 200) {
        throw new Error("Error al obtener los datos de rutas");
      }
      return res.data.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return []; // Devuelve un array vacío en caso de error.
    }
  };