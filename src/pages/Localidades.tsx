import { useForm } from "react-hook-form";
import styles from './localidades.module.css'
import Card from '../components/Card';
import Table from '../components/Table';
import useToast from '../hooks/useToast';
import { Link, useLoaderData, useParams } from "react-router-dom";
import Acciones from "../components/Acciones";
import { LocalidadRegistrar, eliminarLocalidad, localidadActualizar, localidadRegistrar, localidadesLoader } from "../api/localidades";
import { useEffect, useState } from "react";

interface LocalidadesTypes {
    id_localidad: number;
    nombre: string;
    acronimo: string;
    acciones?: JSX.Element;
}

const Localidades = () => {

    const { id } = useParams();

    // Uso de useLoaderData con el tipo esperado
    const localidadesData: LocalidadesTypes[] = useLoaderData() as LocalidadesTypes[];
    const [localidades, setlocalidades] = useState<LocalidadesTypes[]>(localidadesData)

    const actualizarLocalidades = async () => {
        const cargarNuevasLocalidades = await localidadesLoader();
        setlocalidades(cargarNuevasLocalidades)
    }

    const { register, handleSubmit, setValue, reset, formState: {
        errors
    } } = useForm<LocalidadRegistrar>();
    const showToast = useToast();

    const eliminar = async (id: number): Promise<void> => {
        console.log('Eliminando el ID:', id);
        const seElimino = await eliminarLocalidad(id);
        if (seElimino) {
            showToast('Se elimino la localidad', 'success', 'bottom-center')
            actualizarLocalidades()
        }
        else showToast('Error al eliminar la localidad', 'error', 'bottom-center');
    }


    useEffect(() => {
        if (id) {
            console.log('se detecto id')
            const localidadEditar = localidadesData.find(localidad => localidad.id_localidad === +id)
            if (localidadEditar) {
                setValue('nombre', localidadEditar.nombre)
                setValue('acronimo', localidadEditar.acronimo)
            }

        } else reset()

    }, [id])


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
        {
            name: 'Acciones',
            cell: (row: LocalidadesTypes) => <Acciones editarLink={`/registros/localidades/${row.id_localidad}`} eliminar={eliminar} id={row.id_localidad} />
        }

    ];

    const onSubmit = async (data: LocalidadRegistrar) => {
        try {
            if (!id) {
                const statusCode = await localidadRegistrar(data);
                if (statusCode === 201) {
                    actualizarLocalidades()
                    showToast(`Localidad registrada`, 'success', 'bottom-center');
                } else {
                    showToast('Error al registrar localidad', 'error', 'bottom-center');
                }
                return;
            }

            const respuesta = await localidadActualizar(+id, data);
            console.log({ respuesta })
            if (respuesta) {
                actualizarLocalidades()
                showToast(`Localidad actualizada`, 'success', 'bottom-center');
            }
        } catch (error) {
            showToast('Error al realizar la operación', 'error', 'bottom-center');
        }
    };


    return (
        <Card>
            <header>Registros 📍</header>
            {
                id &&
                <div className="buttons">
                    <button className="save-button">
                        <span className="button-text"> <Link to="/registros/localidades">Nueva Localidad </Link></span>
                        <i className='bx bx-plus-circle'></i>
                    </button>
                </div>
            }

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={`${styles.details} ${styles.personal}`}>
                    <span className={styles.title}>Localidades</span>

                    <div className={styles.fields}>
                        <div className={styles['input-fields']}>
                            <label htmlFor="nombre">Nombre localidad</label>
                            <input
                                type="text"
                                id="nombre"
                                placeholder="Ejemplo: Ciudad Central"
                                {...register('nombre', {
                                    required: true,
                                    maxLength: 30
                                })}
                            />

                            {errors.nombre && <span className="input-error">Este campo es requerido</span>}

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
                            {errors.acronimo && <span className="input-error">Este campo es requerido</span>}

                        </div>
                    </div>
                </div>

                <div className="buttons">
                    <button className={styles['save-button']}>
                        <span className={styles['button-text']}>Guardar</span>
                        <i className='bx bx-plus-circle'></i>
                    </button>
                </div>

            </form>

            <Table datos={localidades} titulo="Lista de localidades registradas" columnas={columnas} />

        </Card>
    )
}

export default Localidades