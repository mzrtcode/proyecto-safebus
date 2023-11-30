import { dividirPorSaltoDeLinea, formatearNumeroConComas, generarTabla } from '../utils/utils'
import styles from './planilla.module.css'

export type PlanillaProps = {
  datos: {
    razon_social: string
    nit: string
    telefono: string
    direccionEmpresa: string
    direccionAgencia: string
    fechaCreacion: string
    numeroPlanilla: number
    agencia: string
    despachador: string
    horaSalida: string
    ruta: string
    vehiculoPlaca: string,
    vehiculoCodigo: string,
    pasajes: number
    precio: number
    total: string,
    aseguradora: string
    numeroPoliza: string
    puestos: number
    fechaImpresion: string,
    fondoReposicion: string,
    mensaje: string,
    costoPlanilla: string,
    webEmpresa: string,
    conductor: string,
    vehiculoPropietario: string,
    totalDeducciones: string
    netoPlanilla: string
  }
}

const Planilla: React.FC<PlanillaProps> = ({ datos }) => {

 
  const { razon_social,
    nit,
    telefono,
    direccionEmpresa,
    direccionAgencia,
    fechaCreacion,
    numeroPlanilla,
    agencia,
    despachador,
    horaSalida,
    ruta,
    fondoReposicion,
    costoPlanilla,
    puestos,
    vehiculoPlaca,
    vehiculoCodigo,
    vehiculoPropietario,
    total,
    fechaImpresion,
    conductor,
    totalDeducciones,
    netoPlanilla
  } = datos



  return (
    <div className={styles.planilla}>
      <div className={styles.cabecera}>
        <p>{razon_social}</p>
        <p className={styles.nit}>Nit: {nit}</p>
        <p>{direccionEmpresa} Tel: {telefono}</p>
        <p>{direccionAgencia}</p>
      </div>

      <div className={styles['info-tiquete']}>
        <p className={styles['texto-centrado']}>----------[ Planilla de Viaje ]----------</p>
        <span><p>Fecha: {fechaCreacion}</p>  <pre>No :{numeroPlanilla}</pre> </span>
        <p>-----------------------------------------</p>

        <p>Agencia......: {agencia}</p>
        <p>Despachador..: {despachador}</p>
        <p>Ruta.........: {ruta}</p>
        <p>Hora-Salida..: {horaSalida}</p>
        <p>Vehiculo.....: {vehiculoCodigo} Placas: {vehiculoPlaca}</p>
        <p>Conductor....: {conductor}</p>
        <p>Propietario..: {vehiculoPropietario}</p>

        <p>-----------------------------------------</p>
        {
          dividirPorSaltoDeLinea(generarTabla([
            [ruta, puestos.toString(), total]
          ])).map(linea =>
            {
              return <pre>{linea}</pre>
            })
        }
        <pre>----------------Total$       {puestos}     {total}</pre>
        <br />
        <br />
        <p className={styles['texto-centrado']}>--------[ GASTOS Y DEDUCCIONES ]--------</p>
        <pre className={styles['texto-centrado']}> Cpt Descripcion                     Valor</pre>
        <p>-----------------------------------------</p>
        <p>Gasto-Despacho.........</p>
        <pre>Planilla                            {costoPlanilla}</pre>
        <pre>Fondo Reposicion                    {fondoReposicion}</pre>
        <pre>----------Total deducciones:        {totalDeducciones}</pre>
        <br />
        <br />
        <p className={styles['texto-centrado']}>--------- NETO Planilla: {netoPlanilla} ---------</p>
        <p>Impreso: {fechaImpresion}</p>
      </div >

  <div className={styles['pie-pagina']}>
    <br />
    <br />
    <br />
    <pre>-------------------     -------------------</pre>
    <pre>Despachador             Motorista</pre>
  </div>
    </div >

  )
}

export default Planilla