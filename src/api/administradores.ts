import { TipoIdentificacion } from './auth.d';
import axios from './axios';

export interface administradorTypes {
    id_administrador: number
    nombres: string
    apellidos: string
    tipo_identificacion: TipoIdentificacion
    numero_identificacion: string
    correo: string
    celular: string
    fecha_nacimiento: Date | string
    direccion: string
    estado: boolean
    acciones: JSX.Element
  }

  export type AdministradorRegistrar = Omit<administradorTypes, 'id_administrador' | 'acciones' >;



  export const administradoresLoader = async (): Promise<administradorTypes[]> => {
    try {
      const res = await axios.get("/administradores");
      if (res.status !== 200) {
        throw new Error("Error al obtener los datos de administradores");
      }
      
      // Convertir las fechas en formato ISO 8601 a objetos Date
      const administradores = res.data.data.map((administrador: administradorTypes) => {
        return {
          ...administrador,
          fecha_nacimiento: new Date(administrador.fecha_nacimiento)
        };
      });
  
      return administradores;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return []; // Devuelve un array vacío en caso de error.
    }
  };

  export const administradorEliminar = async (id_administrador: number): Promise<boolean> => {
    try {
      const response = await axios.delete(`/administradores/${id_administrador}`);
      if (response.status === 204) return true;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return false;
    }
    return false;
  }

  export const administradorRegistrar = async (administrador: AdministradorRegistrar): Promise<number> => {
    const response = await axios.post('/administradores', administrador);
    return response.status; // Devuelve el código de estado de la respuesta
  
  };
  
  
  export const obtenerAdministrador = async (id_administrador: number): Promise<administradorTypes> => {
    try {
      const response = await axios.get(`/administradores/${id_administrador}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Aquí puedes manejar el error como prefieras
      console.error('Error al obtener el administrador:', error);
      throw error; // Puedes relanzar el error si es necesario
    }
  };
  
  export const actualizarAdministrador = async (id_administrador: number, administrador: AdministradorRegistrar) => {
    try {
      const response = await axios.put(`/administradores/${id_administrador}`, administrador);
      
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


  export const desactivarAdministrador = async (id_administrador: number, estadoActual: boolean) => {
    try{
      const response = await axios.put(`/administradores/${id_administrador}`, {
        estado: !estadoActual
      });
      if (response.status === 200) return true;
    }catch(error){
      if (error instanceof Error) {
        console.log(error.message);
      }
      return false;
    }
  }

  export const resetearClave = async (id_administador: number):Promise<boolean> => {
    try{
      const response = await axios.post(`/administradores/${id_administador}/resetear-clave`);
      if (response.status === 200) return true;
    }catch(error){
      if (error instanceof Error) {
        console.log(error.message);
      }
      return false;
    }
    return false;
  }