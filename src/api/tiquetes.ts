import axios from './axios';

export interface TiquetesVendidos {
  id_planilla: number
  id_tiquete: number
  puestos_vendidos: number
  fecha_hora: Date
}

export type NuevoTiquete = Omit<TiquetesVendidos, 'id_tiquete' | 'fecha_hora'>;



export const obtenerTiquetesVendedidosPorPlanillaId = async (id_ruta: number): Promise<TiquetesVendidos[]> => {
  try {
    const response = await axios.get(`/tiquetes/${id_ruta}`);
    if (response.status !== 200) {
      throw new Error("Error al obtener los tiquetes");
    }

    // Convertir las fechas en formato ISO 8601 a objetos Date
    const tiquetes = response.data.data.map((tiquete: TiquetesVendidos) => {
      return {
        ...tiquete,
        fecha_hora: new Date(tiquete.fecha_hora)
      };
    });

    return tiquetes;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return []; // Devuelve un array vacío en caso de error.
  }
}


export const registrarTiquete = async (tiquete: NuevoTiquete): Promise<number> => {
  const response = await axios.post('/tiquetes', tiquete);
  return response.status; // Devuelve el código de estado de la respuesta

};