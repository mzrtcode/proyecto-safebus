import axios from './axios';

interface VehiculoTypes {
    id_vehiculo: number
    id_propietario: number
    placa: string
    marca: string
    modelo: string
    color: string
    anio_fabricacion: string
    codigo_interno: string
    cantidad_puestos: number

  }


export const vehiculosLoader = async (): Promise<VehiculoTypes[]> => {
    try {
      const res = await axios.get("/v1/vehiculos");
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