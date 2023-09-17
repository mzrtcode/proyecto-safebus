import axios from './axios';

export interface EmpresaTypes {
    nit: string,
    razon_social: string,
    direccion: string,
    telefono: string,
    ciudad: string,
  }

  export const obtenerEmpresa = async (): Promise<EmpresaTypes | null> => {
    try {
      const res = await axios.get("/empresa");
      console.log(res)
      if (res.status !== 200) {
        throw new Error("Error al obtener los datos de la empresa");
      }
      return res.data.data[0];
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        console.log(error.message);
      }
      return null; // Devuelve un array vacío en caso de error.
    }
  };