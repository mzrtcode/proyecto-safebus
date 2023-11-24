import { generarTablaCentrada } from '../utils/utils'
import TablaTiquete from './TablaTiquete'
import styles from './planilla.module.css'

export type PlanillaProps = {
  datos: {
    razon_social: string
    nit: string
    telefono: string
    direccionEmpresa: string
    direccionAgencia: string
    fecha: string
    numeroPlanilla: string
    agencia: string
    despachador: string
    horaSalida: string
    ruta: string
    tarifa: number
    vehiculoPlaca: string,
    vehiculoCodigo: string,
    pasajes: number
    total: number,
    aseguradora: string
    numeroPoliza: string
    puestos: number
    fechaImpresion: string
    mensaje: string,
    webEmpresa: string,
    conductor: string,
    vehiculoPropietario: string
  }
}

const Planilla: React.FC<PlanillaProps> = ({ datos }) => {

  const titulos = ['Titulo 1', 'Titulo 2', 'Titulo 3', 'Titulo 4'];
  const datoss = [
    ["Valor1", "Valor2", "Valor3", "Valor4"],
    ["Valor5", "Valor6", "Valor7", "Valor8"]
  ];

  const { razon_social,
    nit,
    telefono,
    direccionEmpresa,
    direccionAgencia,
    fecha,
    numeroPlanilla,
    agencia,
    despachador,
    horaSalida,
    ruta,
    vehiculoPlaca,
    vehiculoCodigo,
    vehiculoPropietario,
    total,
    fechaImpresion,
    conductor
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
        <span><p>Fecha: {fecha}</p>  <pre>No :{numeroPlanilla}</pre> </span>
        <p>-----------------------------------------</p>

        <p>Agencia......: {agencia}</p>
        <p>Despachador..: {despachador}</p>
        <p>Ruta.........: {ruta}</p>
        <p>Hora-Salida..: {horaSalida}</p>
        <p>Vehiculo.....: {vehiculoCodigo} Placas: {vehiculoPlaca}</p>
        <p>Conductor....: {conductor}</p>
        <p>Propietario..: {vehiculoPropietario}</p>

        <p>-----------------------------------------</p>
        {generarTablaCentrada(titulos, datoss).map((linea, index) => (
          <>
          <pre key={index}>{linea}</pre>
          {index === 0 && <pre>---------------------------------------------</pre>}
          </>
        ))}
        <pre>--------------Total$       19         {total}</pre>
        <br />
        <br />
        <p className={styles['texto-centrado']}>--------[ GASTOS Y DEDUCCIONES ]--------</p>
        <pre className={styles['texto-centrado']}> Cpt Descripcion                     Valor</pre>
        <p>-----------------------------------------</p>
        <p>Gasto-Despacho.........</p>
        <p>Planilla</p>
        <p>Fondo Reposicion</p>
        <p>----------Total deducciones: 8,700</p>
        <br />
        <br />
        <p className={styles['texto-centrado']}>--------- NETO Planilla: 52,100 ---------</p>
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