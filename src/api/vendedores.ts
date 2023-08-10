import { TipoIdentificacion } from './auth.d';
import axios from './axios';

export interface VendedorTypes {
    id_vendedor: number
    nombres: string
    apellidos: string
    tipo_identificacion: TipoIdentificacion
    numero_identificacion: string
    correo: string
    celular: string
    fecha_nacimiento: Date
    direccion: string
  }



  export const vendedorLoader = async (): Promise<VendedorTypes[]> => {
    try {
      const res = await axios.get("/conductores");
      if (res.status !== 200) {
        throw new Error("Error al obtener los datos de conductores");
      }
      
      // Convertir las fechas en formato ISO 8601 a objetos Date
      const vendedores = res.data.data.map((vendedor: VendedorTypes) => {
        return {
          ...vendedor,
          fecha_nacimiento: new Date(vendedor.fecha_nacimiento)
        };
      });
  
      return vendedores;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return []; // Devuelve un array vacío en caso de error.
    }
  };
