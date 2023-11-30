import { dividirPorSaltoDeLinea, formatearNumeroConComas, generarTabla, generarTablaInformePlanillas } from '../utils/utils'
import styles from './tiraPlanillaje.module.css'

export type TiqueteProps = {
    datos: {
        razon_social: string
        nit: string
        telefono: string
        direccionAgencia: string
        direccionEmpresa: string
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
        datosResumenPasajes: string[][]
        datosRelacionPlanillas: string[][],
        totalCantidadTiqueteado: string,
        totalCantidadRelacionPlanillas: string,
        totalTiqueteadoValor: string,
        totalRelacionPlanillasValor: string
    }
}

const TiraPlanillaje: React.FC<TiqueteProps> = ({ datos }) => {

    const { razon_social,
        nit,
        telefono,
        direccionEmpresa,
        direccionAgencia,
        fecha,
        numeroTiquete,
        agencia,
        despachador,
        datosRelacionPlanillas,
        datosResumenPasajes,
        totalCantidadTiqueteado,
        totalCantidadRelacionPlanillas,
        totalTiqueteadoValor,
        totalRelacionPlanillasValor
        
        } = datos

    return (
        <div className={styles.tiquete}>
            <div className={styles.cabecera}>
                <p>{razon_social}</p>
                <p className={styles.nit}>Nit: {nit}</p>
                <p>{direccionEmpresa} Tel: {telefono}</p>
                <p>{direccionAgencia}</p>
                <br />
            </div>

            <div className={styles['info-tiquete']}>
                <p className={styles['texto-centrado']}>----------[ Tiquete de Viaje ]----------</p>
                <span><p>Fecha: {fecha}</p>  <p>No :{numeroTiquete}</p> </span>
                <p>-----------------------------------------</p>

                <p>Agencia......: {agencia}</p>
                <p>Despachador..: {despachador}</p>
                <pre>------------ [ RESUMEN PASAJES ] ------------</pre>
                {
                    dividirPorSaltoDeLinea(generarTabla(datosResumenPasajes)).map(linea => {
                        return <pre>{linea}</pre>
                    })
                }
                <br />
                <pre>----Total Tiqueteado:       {totalCantidadTiqueteado}   {totalTiqueteadoValor}</pre>
                <br />
                <pre>---------- [ RELACION PLANILLAS ] -----------</pre>

                {
                    dividirPorSaltoDeLinea(generarTablaInformePlanillas(datosRelacionPlanillas)).map(linea =>{
                        return <pre>{linea}</pre>
                    })
                }
                <br />
                <pre>---------------Total:      {totalCantidadRelacionPlanillas}   {totalRelacionPlanillasValor}</pre>
            </div>


            <div className={styles['pie-pagina']}>
                <br />
               <pre>{razon_social}</pre>
               <pre>{nit}</pre>
            </div>
        </div>

    )
}

export default TiraPlanillaje