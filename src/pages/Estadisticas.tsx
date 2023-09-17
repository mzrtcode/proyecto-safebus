import Card from "../components/Card"
import styles from './estatisticas.module.css'

const Estadisticas = () => {
    return (
        <Card>
            <div className={styles.wrapper}>
            <section>
                <p className={styles.titulo}>Ventas totales</p>
                <p className={`${styles.valor} ${styles["texto-verde"]}`}>$ 2.664.500</p>
            </section>
            <section>
                <p className={styles.titulo}>Planillas total</p>
                <p className={`${styles.valor} ${styles["texto-morado"]}`}>$ 729.000</p>
            </section>
            <section>
                <p className={styles.titulo}>Clientes</p>
                <p className={styles.valor}>1023</p>
            </section>
            <section>
                <p className={styles.titulo}>Planillas Vendidas</p>
                <p className={styles.valor}>253</p>
            </section>
            </div>
        </Card>
    )
}

export default Estadisticas