import styles from './planilla.module.css'
type Datos = {
    ruta: string,
    vehiculo: string,
    estado: string
}

type PlanillaProps = {
    datos: Datos;
};

const Planilla = ({ datos }: PlanillaProps) => {
    return (
        <div className={styles.planilla}> {/* seleccionado */}
            <div className={styles["planilla-info"]}>
                <span className={styles.ruta}>{datos.ruta}</span>
                <span className={styles.vehiculo}>{datos.vehiculo}</span>
            </div>

            <div className={styles["planilla_estado"]}>
                <span className={`${styles.estado} ${datos.estado === "despachado" ? styles.despachado : ""}`}>{datos.estado}</span> {/* pendiente despachado */}
            </div>
        </div>

    )
}
export default Planilla