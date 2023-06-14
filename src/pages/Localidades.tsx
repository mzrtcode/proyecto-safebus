import { useForm } from "react-hook-form";
import styles from './localidades.module.css'
import Card from '../components/Card';
import Table from '../components/Table';
import useToast from '../hooks/useToast';

const Localidades = () => {

    const { register, handleSubmit } = useForm();

    const showToast = useToast();

    const handleShowAlert = () => {
        showToast('Este es un de prueba', 'success', 'bottom-center');
    };


    const localidadesData = [
        { id: 1, nombre_localidad: 'Ciudad Central', acronimo: 'CCN' },
        { id: 2, nombre_localidad: 'Pueblo Nuevo', acronimo: 'PNV' },
        { id: 3, nombre_localidad: 'Villa del Sol', acronimo: 'VDS' },
        { id: 4, nombre_localidad: 'Ciudad del Este', acronimo: 'CDE' },
        { id: 5, nombre_localidad: 'Ciudad del Oeste', acronimo: 'CDO' },
        { id: 6, nombre_localidad: 'Ciudad del Norte', acronimo: 'CDN' },
        { id: 7, nombre_localidad: 'Ciudad del Sur', acronimo: 'CDS' },
        { id: 8, nombre_localidad: 'Ciudad del Centro', acronimo: 'CDC' },
        { id: 9, nombre_localidad: 'Ciudad del Este', acronimo: 'CDE' },
        { id: 10, nombre_localidad: 'Ciudad del Oeste', acronimo: 'CDO' },
    ];

    const columnas = [
        {
            name: 'ID',
            selector: 'id',
            sortable: true
        },
        {
            name: 'Nombre Localidad',
            selector: 'nombre_localidad',
            sortable: true
        },
        {
            name: 'Acronimo',
            selector: 'acronimo',
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

export default Localidades