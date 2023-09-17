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
  cantidad_puestos_vehiculo: number;
  precio_ruta: number
  viaje_completado: boolean,
  acronimo_inicio: string,
  acronimo_fin: string
}

export interface PlanillaRegistrar {
  id_ruta: number;
  id_conductor: number;
  id_vendedor: number;
  id_vehiculo: number;
  id_agencia: number;
  viaje_completado?: boolean;
  hora_salida?: Date | null;
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

export const planillaRegistrar = async (planilla: PlanillaRegistrar): Promise<number> => {
  const response = await axios.post('/planillas', planilla);
  return response.status; // Devuelve el código de estado de la respuesta

};

export const despacharPlanilla = async (id_planilla: number): Promise<number> => {
  const response = await axios.post(`/planillas/despachar/${id_planilla}`);
  return response.status; // Devuelve el código de estado de la respuesta
};

export const eliminarPlanilla = async (id_planilla: number): Promise<number> => {
  const response = await axios.post(`/planillas/${id_planilla}`);
  return response.status; // Devuelve el código de estado de la respuesta
};



