import Card from '../components/Card'
import { useForm } from "react-hook-form";
import styles from './rutas.module.css'
import Table from '../components/Table';
import Checkbox from '../components/Checkbox';
import { useLoaderData } from 'react-router-dom';

interface RutasTypes {
  id_ruta: number;
  inicio_ruta: string;
  fin_ruta: string;
  costo: number;
  estado: number | JSX.Element;
}

const Rutas = () => {

   // Uso de useLoaderData con el tipo esperado
  const rutasData = useLoaderData() as RutasTypes[];

  const { register, handleSubmit} = useForm();
  const onSubmit = (data:any) => {
    console.log(data)
  }

  
  const columnas = [
    {
      name: 'Inicio Ruta',
      selector: (row: RutasTypes) => row.inicio_ruta,
      sortable: true
    },
    {
      name: 'Fin Ruta',
      selector: (row: RutasTypes) => row.fin_ruta,
      sortable: true
    },
    {
      name: 'Costo',
      selector: (row: RutasTypes) => row.costo,
      sortable: true
    },

     {
      name: 'Estado',
      cell: (row:RutasTypes) => <Checkbox initialState={row.estado === 1} onToggle={() => {
        console.log('Cambié de estado mi es ID:', row.id_ruta);
      }} />,
    },
  ];
  



  return (
    <Card>
      <header>Registros 🗺️</header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${styles.details} ${styles.personal}`}>
          <span className={styles.title}>Rutas</span>

          <div className={styles.fields}>
            <div className={styles['input-fields']}>
              <label htmlFor="inicioRuta">Inicio Ruta</label>
              <input
                type="text"
                id="inicioRuta"
                placeholder="Ingrese el inicio de la ruta"
                {...register('inicioRuta', {
                  required: true,
                })}
              />
              <span className={styles['input-error']}>Este campo es requerido</span>
            </div>

            <div className={styles['input-fields']}>
              <label htmlFor="finRuta">Fin de Ruta</label>
              <input
                type="text"
                id="finRuta"
                placeholder="Ingrese el fin de la ruta"
                {...register('finRuta', {
                  required: true,
                })}
              />
              <span className={styles['input-error']}>Este campo es requerido</span>
            </div>

            <div className={styles['input-fields']}>
              <label htmlFor="costo">Costo</label>
              <input
                type="number"
                id="costo"
                placeholder="Ingrese el costo"
                {...register('costo', {
                  required: true,
                })}
              />
              <span className={styles['input-error']}>Este campo es requerido</span>
            </div>

          </div>
        </div>

        <button className={styles['save-button']}>
          <span className={styles['button-text']}>Guardar</span>
          <i className='bx bx-plus-circle'></i>
        </button>


      </form>

      <Table datos={rutasData} titulo="Lista de rutas registradas" columnas={columnas} />
    </Card>
  )
}

// loader function
export const rutasLoader = async (): Promise<RutasTypes[]> => {
  const res = await fetch("http://localhost:3000/api/v1/rutas");
  return res.json();
};

export default Rutas