import styles from './planilla.module.css'

export type PlanillaProps = {
    datos: {
    razon_social: string
    nit: string
    telefono: string
    direccion: string
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
    fechaImpresion: string
    mensaje: string,
    webEmpresa: string,
    conductor: string,
    vehiculoPropietario: string
    }
}

const Planilla: React.FC<PlanillaProps> = ({ datos }) => {

    const { razon_social,
         nit,
         telefono,
         direccion,
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
                <p>{direccion} Tel: {telefono}</p>
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
                <pre className={styles['texto-centrado']}>Tiquetes / Pasajes        Cant        Valor</pre>
                <p>-----------------------------------------</p>
                <pre>00 INICIO-DESTINO          19         60,000</pre>
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
            </div>

            <div className={styles['pie-pagina']}>
                <br />
                <br />
                <br />
                <pre>-------------------     -------------------</pre>
                <pre>Despachador             Motorista</pre>
            </div>
        </div>

    )
}

export default Planilla