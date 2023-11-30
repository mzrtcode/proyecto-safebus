import axios from './axios';

export interface TiquetesVendidos {
  id_planilla: number
  id_tiquete: number
  puestos_vendidos: number
  fecha_hora: Date
}

export type NuevoTiquete = Omit<TiquetesVendidos, 'id_tiquete' | 'fecha_hora'>;



export const obtenerTiquetesVendedidosPorPlanillaId = async (id_planilla: number): Promise<TiquetesVendidos[]> => {
  try {
    const response = await axios.get(`/tiquetes/${id_planilla}`);
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


type TiqueteData = {
  id: number;
  id_planilla: number;
  puestos_vendidos: number;
};

export const registrarTiquete = async (tiquete: NuevoTiquete): Promise<{ status: number, data: TiqueteData }> => {
  try {
    const response  = await axios.post('/tiquetes', tiquete);
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: 500, data: {id: 0, id_planilla: 0, puestos_vendidos: 0} || { mensaje: 'Error interno del servidor' } };
  }
};


export const eliminarTiquete = async (id_tiquete: number): Promise<{ status: number, data: TiqueteData }> => {
  try {
    const response  = await axios.delete(`/tiquetes/${id_tiquete}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: 500, data: {id: 0, id_planilla: 0, puestos_vendidos: 0} || { mensaje: 'Error interno del servidor' } };
  }
}