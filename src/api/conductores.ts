import { TipoIdentificacion } from './auth.d';
import axios from './axios';

export interface ConductorTypes {
    id_conductor: number
    nombres: string
    apellidos: string
    tipo_identificacion: TipoIdentificacion
    numero_identificacion: string
    correo: string
    celular: string
    fecha_nacimiento: Date
    direccion: string
  }


  export const conductoresLoader = async (): Promise<ConductorTypes[]> => {
    try {
      const res = await axios.get("/conductores");
      if (res.status !== 200) {
        throw new Error("Error al obtener los datos de conductores");
      }
      
      // Convertir las fechas en formato ISO 8601 a objetos Date
      const conductores = res.data.data.map((conductor: ConductorTypes) => {
        return {
          ...conductor,
          fecha_nacimiento: new Date(conductor.fecha_nacimiento)
        };
      });
  
      return conductores;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return []; // Devuelve un array vacío en caso de error.
    }
  };

  export const formatearFecha = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };