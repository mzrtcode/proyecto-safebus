import CardContainer from "../components/CardContainer"
import Table from "../components/Table"
import styles from './reportes.module.css'


function Reportes() {

  interface ResumenPasajes {
    trayecto: string;
    cantidad: number,
    valorTotal: number;
  }

  const columnasResumenPasajes = [
    {
      name: 'Trayecto',
      selector: (row: ResumenPasajes) => row.trayecto,
      sortable: true
    },
    {
      name: 'Cantidad',
      selector: (row: ResumenPasajes) => row.cantidad,
      sortable: true
    },
    {
      name: 'Valor Total',
      selector: (row: ResumenPasajes) => row.valorTotal,
      sortable: true
    }
  ];



  interface RelacionPlanillas {
    planilla: string;
    vehiculo: string;
    trayecto: string;
    pasajeros: number;
    valorTotal: number;
  }

  const columnasRelacionPlanillas = [
    {
      name: 'Planilla',
      selector: (row: RelacionPlanillas) => row.planilla,
      sortable: true
    },
    {
      name: 'Vehiculo',
      selector: (row: RelacionPlanillas) => row.vehiculo,
      sortable: true
    },
    {
      name: 'Trayecto',
      selector: (row: RelacionPlanillas) => row.trayecto,
      sortable: true
    },
    {
      name: 'Pasajes',
      selector: (row: RelacionPlanillas) => row.pasajeros,
      sortable: true
    },
    {
      name: 'Valot Total',
      selector: (row: RelacionPlanillas) => row.valorTotal,
      sortable: true
    }
  ];



  return (
    <CardContainer>
      <header className={styles.header}>Reportes 📄</header>

      <div className={styles["input-fields"]}>
        <label htmlFor="codigo_interno">Fecha</label>
        <input type="date" id="fecha"></input>
        {/*    {errors.codigo_interno && <span className={styles["input-error"]}>Este campo es requerido</span>} */}
      </div>


      <div>
        <h4>Resumen Pasajes</h4>
        <Table columnas={columnasResumenPasajes} datos={[{ 'trayecto': 'Bogota - Medellin', 'cantidad': 10, 'valorTotal': 100000 }]} />
        <p>total</p>

        <h4>Relacion Planillas</h4>
        <Table columnas={columnasRelacionPlanillas} datos={[{ 'planilla': '123', 'vehiculo': 'ABC123', 'trayecto': 'C50', 'pasajeros': 10, 'valorTotal': 100000 }]} />
        <p>total</p>




      </div>
    </CardContainer>
  )
}

export default Reportes
