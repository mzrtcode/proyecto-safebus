import axios from './axios';

export interface AgenciaTypes {
    id_agencia: number
    nombre: string
    codigo_interno: string
    direccion: string
    estado: boolean
  }


export const agenciasLoader = async (): Promise<AgenciaTypes[]> => {
    try {
      const res = await axios.get("/agencias");
      if (res.status !== 200) {
        throw new Error("Error al obtener los datos de agencias");
      }
      return res.data.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return []; // Devuelve un array vacío en caso de error.
    }
  };