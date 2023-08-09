import axios from './axios';

interface RutasTypes {
    id_ruta: number
    inicio_ruta: string
    fin_ruta: string
    estado: boolean | JSX.Element;
    costo?: number
  }


  export interface RutaType extends Omit<RutasTypes, 'inicio_ruta' | 'fin_ruta' | 'costo'> {
    inicio_ruta: number;
    fin_ruta: number;
    nombre_inicio: string;
    nombre_fin: string;
    acronimo_inicio: string;
    acronimo_fin: string;
    costo: boolean;
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


export const obtenerRuta = async (id_ruta: number): Promise<RutaType> => {
  try {
    const response = await axios.get(`/rutas/${id_ruta}`);
    console.log('rutica');
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Aquí puedes manejar el error como prefieras
    console.error('Error al obtener la ruta:', error);
    throw error; // Puedes relanzar el error si es necesario
  }
};