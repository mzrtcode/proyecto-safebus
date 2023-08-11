import { TipoIdentificacion } from './auth.d';
import axios from './axios';

export interface ConductorTypes {
    id_conductor: number
    nombres: string
    apellidos: string
    tipo_identificacion: TipoIdentificacion
    numero_identificacion: string
    correo: string
    celular: string
    fecha_nacimiento: Date | string
    direccion: string
    acciones?: JSX.Element
  }

  export type ConductorRegistrar = Omit<ConductorTypes, 'id_conductor' | 'acciones' >;

  export const conductoresLoader = async (): Promise<ConductorTypes[]> => {
    try {
      const res = await axios.get("/conductores");
      if (res.status !== 200) {
        throw new Error("Error al obtener los datos de conductores");
      }
      
      // Convertir las fechas en formato ISO 8601 a objetos Date
      const conductores = res.data.data.map((conductor: ConductorTypes) => {
        return {
          ...conductor,
          fecha_nacimiento: new Date(conductor.fecha_nacimiento)
        };
      });
  
      return conductores;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return []; // Devuelve un array vacío en caso de error.
    }
  };

 

  export const conductorEliminar = async (id_conductor: number): Promise<boolean> => {
    try {
      const response = await axios.delete(`/conductores/${id_conductor}`);
      if (response.status === 204) return true;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return false;
    }
    return false;
  }




  export const conductorRegistrar = async (conductor: ConductorRegistrar): Promise<number> => {
    const response = await axios.post('/conductores', conductor);
    return response.status; // Devuelve el código de estado de la respuesta
  
  };
  
  
  export const obtenerConductor = async (id_conductor: number): Promise<ConductorTypes> => {
    try {
      const response = await axios.get(`/conductores/${id_conductor}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Aquí puedes manejar el error como prefieras
      console.error('Error al obtener la ruta:', error);
      throw error; // Puedes relanzar el error si es necesario
    }
  };
  
  export const actualizarConductor = async (id_conductor: number, conductor: ConductorRegistrar) => {
    try {
      const response = await axios.put(`/conductores/${id_conductor}`, conductor);
      
      if (response.status === 200) {
        return true
      } else {
        return false
        
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return false
    }
  };