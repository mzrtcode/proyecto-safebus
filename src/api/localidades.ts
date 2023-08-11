import axios from './axios';

export interface LocalidadesTypes {
  id_localidad: number;
  nombre: string;
  acronimo: string;
}

export type LocalidadRegistrar = Omit<LocalidadesTypes, 'id_localidad'>;


export const localidadesLoader = async (): Promise<LocalidadesTypes[]> => {
  try {
    const res = await axios.get("/localidades");
    if (res.status !== 200) {
      throw new Error("Error al obtener los datos de localidades");
    }
    return res.data.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      console.log(error.message);
    }
    return []; // Devuelve un array vacío en caso de error.
  }
};

export const eliminarLocalidad = async (id_localidad: number) => {
  try {
    const response = await axios.delete(`/localidades/${id_localidad}`);
    if (response.status === 204) return true;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return false;
  }

}

export const localidadRegistrar = async (localidad: LocalidadRegistrar): Promise<number> => {
  const response = await axios.post('/localidades', localidad);
  return response.status; // Devuelve el código de estado de la respuesta

};

export const obtenerLocadlidad = async (id_localidad: number): Promise<LocalidadesTypes> => {
  try {
    const response = await axios.get(`/localidades/${id_localidad}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Aquí puedes manejar el error como prefieras
    console.error('Error al obtener la ruta:', error);
    throw error; // Puedes relanzar el error si es necesario
  }
};


export const localidadActualizar = async (id_localidad: number, localidad: LocalidadRegistrar): Promise<boolean> => {
  try {
    const response = await axios.put(`/localidades/${id_localidad}`, localidad);
    if (response.status === 200) {
      return true
    } else {
      return false

    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
    return false
  }
};