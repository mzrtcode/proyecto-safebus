import { TipoIdentificacion } from './auth.d';
import axios from './axios';

export interface PropietarioTypes {
    id_propietario: number
    nombres: string
    apellidos: string
    tipo_identificacion: TipoIdentificacion
    numero_identificacion: string
    correo: string
    celular: string
    fecha_nacimiento: Date
    direccion: string
    acciones?: JSX.Element
  }



  export const propietariosLoader = async (): Promise<PropietarioTypes[]> => {
    try {
      const res = await axios.get("/propietarios");
      if (res.status !== 200) {
        throw new Error("Error al obtener los datos de conductores");
      }
      
      // Convertir las fechas en formato ISO 8601 a objetos Date
      const propietarios = res.data.data.map((propietario: PropietarioTypes) => {
        return {
          ...propietario,
          fecha_nacimiento: new Date(propietario.fecha_nacimiento)
        };
      });
  
      return propietarios;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return []; // Devuelve un array vacío en caso de error.
    }
  };