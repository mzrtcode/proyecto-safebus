import Card from '../components/Card'
import { useForm } from "react-hook-form";
import styles from './rutas.module.css'
import Table from '../components/Table';
import Checkbox from '../components/Checkbox';



const Rutas = () => {

  const { register, handleSubmit} = useForm();
  const onSubmit = (data:any) => {
    console.log(data)
  }

  const rutasData = [
    { inicio_ruta: 'Ciudad A', fin_ruta: 'Ciudad B', costo: 100, estado: 1 },
    { inicio_ruta: 'Ciudad B', fin_ruta: 'Ciudad C', costo: 150, estado: 1 },
    { inicio_ruta: 'Ciudad C', fin_ruta: 'Ciudad D', costo: 200, estado: 0 },
    { inicio_ruta: 'Ciudad D', fin_ruta: 'Ciudad E', costo: 250, estado: 1 },
    { inicio_ruta: 'Ciudad E', fin_ruta: 'Ciudad F', costo: 300, estado: 0 },
    { inicio_ruta: 'Ciudad F', fin_ruta: 'Ciudad G', costo: 350, estado: 1 },
  ];


  interface Ruta {
    inicio_ruta: string;
    fin_ruta: string;
    costo: number;
    estado: number | JSX.Element;
  }
  
  const columnas = [
    {
      name: 'Inicio Ruta',
      selector: (row: Ruta) => row.inicio_ruta,
      sortable: true
    },
    {
      name: 'Fin Ruta',
      selector: (row: Ruta) => row.fin_ruta,
      sortable: true
    },
    {
      name: 'Costo',
      selector: (row: Ruta) => row.costo,
      sortable: true
    },

     {
      name: 'Estado',
      cell: (row:Ruta) => <Checkbox initialState={row.estado === 1} onToggle={() => { console.log('cambie de estado') }} />,
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

export default Rutas