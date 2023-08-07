import axios from './axios';

interface RutasTypes {
    id_ruta: number
    inicio_ruta: string
    fin_ruta: string
    estado: boolean
    costo?: number
  }
  export type RutaRegistrar = Omit<RutasTypes, 'id_ruta' | 'estado'>;



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

  export const rutaRegistrar = async (ruta: RutaRegistrar): Promise<number> => {
        const response = await axios.post('/rutas', ruta);
        return response.status; // Devuelve el código de estado de la respuesta

};