import axios from './axios';

export interface LocalidadesTypes {
    id_localidad: number;
    nombre: string;
    acronimo: string;
  }


export const localidadesLoader = async (): Promise<LocalidadesTypes[]> => {
    try {
      const res = await axios.get("/localidades");
      if (res.status !== 200) {
        throw new Error("Error al obtener los datos de localidades");
      }
      return res.data.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        console.log(error.message);
      }
      return []; // Devuelve un array vacío en caso de error.
    }
  };