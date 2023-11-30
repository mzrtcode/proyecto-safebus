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
  direccion_agencia: string;
  hora_salida: Date;
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
  hora_salida: Date;
}


export const planillajeLoader = async (): Promise<PlanillajeTypes[]> => {
  try {
    const res = await axios.get("/planillas");
    if (res.status !== 200) {
      throw new Error("Error al obtener los datos de planillas");
    }

    // Modificar el campo hora_salida y convertirlo a objetos Date
    const planillasConFechaModificada = res.data.data.map((planilla: PlanillajeTypes) => {
      return {
        ...planilla,
        hora_salida: new Date(planilla.hora_salida),
      };
    });

    return planillasConFechaModificada;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return []; // Devuelve un array vacío en caso de error.
  }
};

export const planillaRegistrar = async (planilla: PlanillaRegistrar): Promise<{ status: number, data: PlanillajeTypes }> => {
  try {
    const response = await axios.post('/planillas', planilla);
    return { status: response.status, data: response.data }; // Devuelve el código de estado de la respuesta
  } catch (error) {
    return {
      status: 500, data: {
        id_planilla: 0,
        inicio_ruta: 'N/A',
        fin_ruta: 'N/A',
        nombre_conductor: 'N/A',
        apellido_conductor: 'N/A',
        nombre_vendedor: 'N/A',
        apellido_vendedor: 'N/A',
        numero_placa_vehiculo: 'N/A',
        codigo_interno_vehiculo: 'N/A',
        nombre_agencia: 'N/A',
        direccion_agencia: 'N/A',
        hora_salida: new Date,
        cantidad_puestos_vehiculo: 0,
        precio_ruta: 0,
        viaje_completado: false,
        acronimo_inicio: 'N/A',
        acronimo_fin: 'N/A',
      } || { mensaje: 'Error interno del servidor' }
    };

  }
};

export const despacharPlanilla = async (id_planilla: number): Promise<number> => {
  const response = await axios.put(`/planillas/despachar/${id_planilla}`);
  return response.status; // Devuelve el código de estado de la respuesta
};

export const eliminarPlanilla = async (id_planilla: number): Promise<number> => {
  const response = await axios.delete(`/planillas/${id_planilla}`);
  return response.status; // Devuelve el código de estado de la respuesta
};



