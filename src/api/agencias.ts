import axios from './axios';

export interface AgenciaTypes {
    id_agencia: number
    nombre: string
    codigo_interno: string
    direccion: string
    estado: boolean 
    acciones?: JSX.Element
  }

export type AgenciaRegistrar = Omit<AgenciaTypes, 'id_agencia' | 'acciones'>;



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


  
  export const agenciaEliminar = async (id_agencia: number): Promise<boolean> => {
    try {
      const response = await axios.delete(`/agencias/${id_agencia}`);
      if (response.status === 204) return true;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return false;
    }
    return false;
  }

  export const agenciaRegistrar = async (agencia: AgenciaRegistrar): Promise<number> => {
    const response = await axios.post('/agencias', agencia);
    return response.status; // Devuelve el código de estado de la respuesta
  
  };

  export const obtenerAgencia = async (id_agencia: number): Promise<AgenciaTypes> => {
    try {
      const response = await axios.get(`/agencias/${id_agencia}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Aquí puedes manejar el error como prefieras
      console.error('Error al obtener la agencia:', error);
      throw error; // Puedes relanzar el error si es necesario
    }
  };
  
  export const actualizarAgencia = async (id_agencia: number, agencia: AgenciaRegistrar) => {
    try {
      const response = await axios.put(`/agencias/${id_agencia}`, agencia);
      
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

  export const desactivarAgencia = async (id_agencia: number, estadoActual: boolean) => {
    try{
      const response = await axios.put(`/agencias/${id_agencia}`, {
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