import axios from './axios';

export interface VehiculoTypes {
    id_vehiculo: number
    id_propietario: number
    nombres_propietario: string
    apellidos_propietario: string
    numero_identificacion_propietario: string
    placa: string
    marca: string
    modelo: string
    color: string
    anio_fabricacion: string
    codigo_interno: string
    cantidad_puestos: number
    acciones?: JSX.Element
  }

  export type VehiculoRegistrar = Omit<VehiculoTypes, 'id_vehiculo' | 'acciones' >;



export const vehiculosLoader = async (): Promise<VehiculoTypes[]> => {
    try {
      const res = await axios.get("/vehiculos");
      if (res.status !== 200) {
        throw new Error("Error al obtener los datos de vehiculos");
      }
      return res.data.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return []; // Devuelve un array vacío en caso de error.
    }
  };


  export const vehiculoEliminar = async (id_vehiculo: number): Promise<boolean> => {
    try {
      const response = await axios.delete(`/vehiculos/${id_vehiculo}`);
      if (response.status === 204) return true;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return false;
    }
    return false;
  }

  export const vehiculoRegistrar = async (vehiculo: VehiculoRegistrar): Promise<number> => {
    const response = await axios.post('/vehiculos', vehiculo);
    return response.status; // Devuelve el código de estado de la respuesta
  
  };
  
  
  export const obtenerVehiculo = async (id_vehiculo: number): Promise<VehiculoTypes> => {
    try {
      const response = await axios.get(`/vehiculos/${id_vehiculo}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Aquí puedes manejar el error como prefieras
      console.error('Error al obtener el propietario:', error);
      throw error; // Puedes relanzar el error si es necesario
    }
  };
  
  export const actualizarVehiculo = async (id_vehiculo: number, vehiculo: VehiculoRegistrar) => {
    try {
      const response = await axios.put(`/vehiculos/${id_vehiculo}`, vehiculo);
      
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