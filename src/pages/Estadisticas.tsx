import { useEffect, useState } from "react";
import { EstadisticasTypes, obtenerEstadisticasVendedorId, obtenerEstadisticasVendedores } from "../api/estadisticas";
import Card from "../components/Card"
import { useAuth } from "../context/AuthContext";
import styles from './estatisticas.module.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatearNumeroConComas } from "../utils/utils";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Ventas por semana',
        },
    },
};

const labels = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
export const data = {
    labels,
    datasets: [
        {
            label: 'Semana 1',
            data: [120000, 135000, 90000, 159000, 220000, 120000, 156000],
            borderColor: '#00d25b',
            backgroundColor: '#5cf8a0',
        },
    ],
};







const Estadisticas = () => {
    const { usuario } = useAuth()

    const [datosEstadisticas, setDatosEstadisticas] = useState<EstadisticasTypes>({
        total_viajes_completados: 0,
        total_puestos_vendidos: 0,
        total_ventas: 0,
    });

    const obtenerEstadisticas = async () => {
        if (usuario.rol === 'vendedor') {
            const respuesta = await obtenerEstadisticasVendedorId(usuario.id_usuario);
            console.log(respuesta)
            if (respuesta !== null) setDatosEstadisticas(respuesta);
        } else {
            const respuesta = await obtenerEstadisticasVendedores();
            console.log(respuesta)
            if (respuesta !== null) setDatosEstadisticas(respuesta);
        }
    }

    useEffect(() => {
        obtenerEstadisticas()
        console.log(datosEstadisticas)
    }, [])



    return (
        <>
            <Card>
                <div className={styles.wrapper}>
                    <section>
                        <p className={styles.titulo}>Ventas totales</p>
                        <p className={`${styles.valor} ${styles["texto-verde"]}`}>$ {formatearNumeroConComas(datosEstadisticas.total_ventas)}</p>
                    </section>
                    <section>
                        <p className={styles.titulo}>Planillas total</p>
                        <p className={`${styles.valor} ${styles["texto-morado"]}`}>$ 729.000FFF</p>
                    </section>
                    <section>
                        <p className={styles.titulo}>Clientes</p>
                        <p className={styles.valor}>{datosEstadisticas.total_puestos_vendidos}</p>
                    </section>
                    <section>
                        <p className={styles.titulo}>Vehiculos despchados</p>
                        
                        <p className={styles.valor}>{datosEstadisticas.total_viajes_completados}</p>
                    </section>
                </div>
            </Card>
            <br />
            <Card>
                <div className={styles.ventas}>
                    <Line options={options} data={data} height="60px" />
                </div>
            </Card>
        <br />
            <div className={styles.dividido}>
                <Card>Grafico Clientes</Card>
                <Card>Grafico Horas</Card>

            </div>
        </>
    )
}

export default Estadisticas