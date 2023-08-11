import { TipoIdentificacion } from './auth.d';
import axios from './axios';

export interface PropietarioTypes {
    id_propietario: number
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

  export type PropietarioRegistrar = Omit<PropietarioTypes, 'id_conductor' | 'acciones' >;



  export const propietariosLoader = async (): Promise<PropietarioTypes[]> => {
    try {
      const res = await axios.get("/propietarios");
      if (res.status !== 200) {
        throw new Error("Error al obtener los datos de conductores");
      }
      
      // Convertir las fechas en formato ISO 8601 a objetos Date
      const propietarios = res.data.data.map((propietario: PropietarioTypes) => {
        return {
          ...propietario,
          fecha_nacimiento: new Date(propietario.fecha_nacimiento)
        };
      });
  
      return propietarios;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return []; // Devuelve un array vacío en caso de error.
    }
  };

  export const propietarioEliminar = async (id_propietario: number): Promise<boolean> => {
    try {
      const response = await axios.delete(`/propietarios/${id_propietario}`);
      if (response.status === 204) return true;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return false;
    }
    return false;
  }

  export const propietarioRegistrar = async (propietario: PropietarioRegistrar): Promise<number> => {
    const response = await axios.post('/propietarios', propietario);
    return response.status; // Devuelve el código de estado de la respuesta
  
  };
  
  
  export const obtenerPropietario = async (id_propietario: number): Promise<PropietarioTypes> => {
    try {
      const response = await axios.get(`/propietarios/${id_propietario}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Aquí puedes manejar el error como prefieras
      console.error('Error al obtener el propietario:', error);
      throw error; // Puedes relanzar el error si es necesario
    }
  };
  
  export const actualizarPropietario = async (id_propietario: number, propietario: PropietarioRegistrar) => {
    try {
      const response = await axios.put(`/propietarios/${id_propietario}`, propietario);
      
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