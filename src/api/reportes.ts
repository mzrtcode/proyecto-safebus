import axios from './axios';


export interface ReporteResumenPasajes {
    id_ruta:          number;
    ruta:     string;
    total_puestos_vendidos: number;
    total_costo:      number;
    agencia_nombre:   string;
    id_agencia:       number;
}


export interface ReporteRelacionPlanillas {
    id_planilla:          number;
    placa:     string;
    id_ruta: number;
    pasajes: number
    valor_total: number
}




export const obtenerReporteResumenPasajes = async (fecha: string): Promise<ReporteResumenPasajes[]> => {
    try {
        const respuesta = await axios.get(`/reportes/resumen-pasajes?fecha=${fecha}`);
        if (respuesta.status !== 200) {
            throw new Error(`Error al obtener los datos de reportes. Estado: ${respuesta.status}`);
        }

        return respuesta.data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return []
    }
};

export const obtenerReporteRelacionPlanillas = async (fecha: string): Promise<ReporteRelacionPlanillas[]> => {
    try {
        const respuesta = await axios.get(`/reportes/relacion-planillas?fecha=${fecha}`);
        if (respuesta.status !== 200) {
            throw new Error(`Error al obtener los datos de reportes. Estado: ${respuesta.status}`);
        }

        console.log(respuesta.data)
        return respuesta.data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return []
    }
};