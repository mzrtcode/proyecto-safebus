import { TipoIdentificacion } from './auth.d';
import axios from './axios';

interface PropietarioTypes {
    id_propietario: number
    nombres: string
    apellidos: string
    tipo_identificacion: TipoIdentificacion
    numero_identificacion: string
    correo: string
    celular: string
    fecha_nacimiento: string
    direccion: string
  }


export const propietariosLoader = async (): Promise<PropietarioTypes[]> => {
    try {
      const res = await axios.get("/v1/propietarios");
      if (res.status !== 200) {
        throw new Error("Error al obtener los datos de propietarios");
      }
      return res.data.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return []; // Devuelve un array vacío en caso de error.
    }
  };