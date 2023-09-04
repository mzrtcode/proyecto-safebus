import axios from './axios';

export interface PlanillajeTypes {
  id_planilla: number;
  inicio_ruta: string;
  fin_ruta: string;
  nombre_conductor: string;
  apellido_conductor: string;
  nombre_vendedor: string;
  apellido_vendedor: string;
  numero_placa_vehiculo: string;
  codigo_interno_vehiculo: string;
  nombre_agencia: string;
  hora_salida: Date | null;
  viaje_completado: boolean
}


export const planillajeLoader = async (): Promise<PlanillajeTypes[]> => {
  try {
    const res = await axios.get("/planillas");
    if (res.status !== 200) {
      throw new Error("Error al obtener los datos de planillas");
    }
    return res.data.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return []; // Devuelve un array vacío en caso de error.
  }
};