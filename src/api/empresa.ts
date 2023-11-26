import axios from './axios';

export interface EmpresaTypes {
    nit: string,
    razon_social: string,
    direccion: string,
    telefono: string,
    ciudad: string,
    mensaje: string,
    porcentaje_costo_planilla: number,
    fondo_reposicion: number,
  }

  export const obtenerEmpresa = async (): Promise<EmpresaTypes | null> => {
    try {
      const res = await axios.get("/empresa");
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


  export const actualizarEmpresa = async (empresa: EmpresaTypes): Promise<number> => {
    const response = await axios.put('/empresa', empresa);
    return response.status; // Devuelve el código de estado de la respuesta
  };