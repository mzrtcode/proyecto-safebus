import styles from './planilla.module.css'

export type PlanillaProps = {
    datos: {
    razon_social: string
    nit: string
    telefono: string
    direccion: string
    direccionAgencia: string
    fecha: string
    numeroTiquete: string
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
    webEmpresa: string
    }
}

const Planilla: React.FC<PlanillaProps> = ({ datos }) => {

    const { razon_social,
         nit,
         telefono,
         direccion,
         direccionAgencia,
         fecha,
         numeroTiquete,
         agencia,
         despachador,
         horaSalida,
         ruta,
         tarifa,
         vehiculoPlaca,
         vehiculoCodigo,
         pasajes,
         fechaImpresion,
         total,
         aseguradora,
         numeroPoliza,
         mensaje, webEmpresa } = datos

    return (
        <div className={styles.planilla}>
            <div className={styles.cabecera}>
                <p>{razon_social}</p>
                <p className={styles.nit}>Nit: {nit}</p>
                <p>{direccion} Tel: {telefono}</p>
                <p>{direccionAgencia}</p>
            </div>

            <div className={styles['info-tiquete']}>
                <p className={styles['texto-centrado']}>----------[ Tiquete de Viaje ]----------</p>
                <span><p>Fecha: {fecha}</p>  <p>No :{numeroTiquete}</p> </span>
                <p>-----------------------------------------</p>

                <p>Agencia......: {agencia}</p>
                <p>Despachador..: {despachador}</p>
                <p>Hora-Salida..: {horaSalida}</p>
                <p>Ruta.........: {ruta}</p>
                <p>Tarifa.......: {tarifa}</p>
                <p>Vehiculo.....: {vehiculoCodigo} Placas: {vehiculoPlaca}</p>
                <p>Pasajes......: {pasajes}     TOTAL: {total}</p>
                <p>Puesto No..:</p>
                <p>-----------------------------------------</p>
                <br />
                <p className={styles['texto-centrado']}>TIQUETE POR FUERA DEL DESPACHO</p>
                <p className={styles['texto-centrado']}> *** RECAUDA EL MOTORISTA ***</p>
                <br />
                <p>-----------------------------------------</p>
            </div>

            <div className={styles['info-poliza']}>
                <p>Aseguradora: {aseguradora}</p>
                <p>No.Poliza..: {numeroPoliza}</p>
                <p>Impres: {fechaImpresion}</p>
            </div>

            <div className={styles['pie-pagina']}>
                <p>-----------------------------------------</p>
                <p>SEÑOR PASAJERO: ESTE ATENTO AL DESPACHO DEL VEHICULO ASIGNADO. LA EMPRESA NO SE RESPONSABILIZA POR PERDIDA DEL VIAJE. EN DE PERDIDA DEL VIAJE NO REINTEGRA EL VALOR DEL MISMO.</p>
                <br />
                <br />
                <p className={styles['texto-centrado']}>{mensaje}</p>
                <p className={styles['texto-centrado']}>{webEmpresa}</p>
            </div>
        </div>

    )
}

export default Planilla