import axios from './axios';

export interface EstadisticasTypes {
    total_viajes_completados: number,
    total_puestos_vendidos: number,
    total_ventas: number,
  }

  export const obtenerEstadisticasVendedores = async (): Promise<EstadisticasTypes | null> => {
    try {
      const res = await axios.get("/estadisticas");
      if (res.status !== 200) {
        throw new Error("Error al obtener las estadisticas");
      }
      return res.data.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        console.log(error.message);
      }
      return null; // Devuelve un array vacío en caso de error.
    }
  };

  export const obtenerEstadisticasVendedorId = async (id_vendedor: number): Promise<EstadisticasTypes | null> => {
    try {
      const res = await axios.get(`/estadisticas/${id_vendedor}`);
      if (res.status !== 200) {
        throw new Error("Error al obtener las estadisticas del vendedor");
      }
      console.log(`/estadisticas/${id_vendedor}`)
      return res.data.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        console.log(error.message);
      }
      return null; // Devuelve un array vacío en caso de error.
    }
  };