import { useForm } from "react-hook-form";
import styles from './localidades.module.css'
import Card from '../components/Card';
import Table from '../components/Table';
import useToast from '../hooks/useToast';
import { useLoaderData } from "react-router-dom";

interface LocalidadesTypes {
    id_localidad: number;
    nombre: string;
    acronimo: string;
  }

const Localidades = () => {
    

    // Uso de useLoaderData con el tipo esperado
    const localidadesData = useLoaderData() as LocalidadesTypes[];

    const { register, handleSubmit } = useForm();
    const showToast = useToast();

    const handleShowAlert = () => {
        showToast('Este es un de prueba', 'success', 'bottom-center');
    };

      
    const columnas = [
        {
            name: 'ID',
            selector: (row: LocalidadesTypes) => row.id_localidad,
            sortable: true
        },
        {
            name: 'Nombre Localidad',
            selector: (row: LocalidadesTypes) => row.nombre,
            sortable: true
        },
        {
            name: 'Acronimo',
            selector: (row: LocalidadesTypes) => row.acronimo,
            sortable: true
        },
     
    ];




    const onSubmit = (data:any) => {
        console.log(data)
    }

    return (
        <Card>
            <header>Registros 📍</header>


            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={`${styles.details} ${styles.personal}`}>
                    <span className={styles.title}>Localidades</span>

                    <div className={styles.fields}>
                        <div className={styles['input-fields']}>
                            <label htmlFor="localidad">Nombre localidad</label>
                            <input
                                type="text"
                                id="localidad"
                                placeholder="Ejemplo: Ciudad Central"
                                {...register('localidad', {
                                    required: true,
                                    maxLength: 30
                                })}
                            />
                            <span className={styles['input-error']}>Este campo es requerido</span>
                        </div>

                        <div className={styles['input-fields']}>
                            <label htmlFor="acronimo">Acrónimo localidad</label>
                            <input
                                type="text"
                                id="acronimo"
                                placeholder="Ejemplo: CEN"
                                {...register('acronimo', {
                                    required: true,
                                    maxLength: 3
                                })}
                            />
                            <span className={styles['input-error']}>Este campo es requerido</span>
                        </div>
                    </div>
                </div>

                <button className={styles['save-button']} onClick={handleShowAlert}>
                    <span className={styles['button-text']}>Guardar</span>
                    <i className='bx bx-plus-circle'></i>
                </button>

            </form>       

            <Table datos={localidadesData} titulo="Lista de localidades registradas" columnas={columnas} />

        </Card>
    )
}

// loader function
export const localidadesLoader = async (): Promise<LocalidadesTypes[]> => {
    try {
        const res = await fetch("http://localhost:3000/api/v1/localidades");
        if (!res.ok) {
            throw new Error("Error al obtener los datos de localidades");
        }
        return res.json();
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        return []; // Devuelve un array vacío en caso de error.
    }
};
export default Localidades