import { TipoIdentificacion } from './auth.d';
import axios from './axios';

export interface VendedorTypes {
    id_vendedor: number
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

  export type VendedorRegistrar = Omit<VendedorTypes, 'id_vendedor' | 'acciones' >;



  export const vendedoresLoader = async (): Promise<VendedorTypes[]> => {
    try {
      const res = await axios.get("/vendedores");
      if (res.status !== 200) {
        throw new Error("Error al obtener los datos de conductores");
      }
      
      // Convertir las fechas en formato ISO 8601 a objetos Date
      const vendedores = res.data.data.map((vendedor: VendedorTypes) => {
        return {
          ...vendedor,
          fecha_nacimiento: new Date(vendedor.fecha_nacimiento)
        };
      });
  
      return vendedores;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return []; // Devuelve un array vacío en caso de error.
    }
  };

  export const vendedorEliminar = async (id_vendedor: number): Promise<boolean> => {
    try {
      const response = await axios.delete(`/vendedores/${id_vendedor}`);
      if (response.status === 204) return true;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return false;
    }
    return false;
  }

  export const vendedorRegistrar = async (vehiculo: VendedorRegistrar): Promise<number> => {
    const response = await axios.post('/vendedores', vehiculo);
    return response.status; // Devuelve el código de estado de la respuesta
  
  };
  
  
  export const obtenerVendedor = async (id_vehiculo: number): Promise<VendedorTypes> => {
    try {
      const response = await axios.get(`/vendedores/${id_vehiculo}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Aquí puedes manejar el error como prefieras
      console.error('Error al obtener el propietario:', error);
      throw error; // Puedes relanzar el error si es necesario
    }
  };
  
  export const actualizarVendedor = async (id_vehiculo: number, vehiculo: VendedorRegistrar) => {
    try {
      const response = await axios.put(`/vendedores/${id_vehiculo}`, vehiculo);
      
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


  export const desactivarVendedor = async (id_vendedor: number, estadoActual: boolean) => {
    try{
      const response = await axios.put(`/vendedores/${id_vendedor}`, {
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

  export const resetearClave = async (id_vendedor: number):Promise<boolean> => {
    try{
      const response = await axios.post(`/vendedores/${id_vendedor}/resetear-clave`);
      if (response.status === 200) return true;
    }catch(error){
      if (error instanceof Error) {
        console.log(error.message);
      }
      return false;
    }
    return false;
  }