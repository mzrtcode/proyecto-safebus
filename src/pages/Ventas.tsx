import Card from '../components/Card'
import './ventas.css'
import styles from './ventas.module.css'
import InputSpinner from '../components/InputSpinner'
import DateTimeComponent from '../components/DateTimeComponent'
import Table from '../components/Table'
import { useForm, SubmitHandler, set } from "react-hook-form";
import { useEffect, useState } from 'react';
import { PlanillajeTypes, despacharPlanilla, eliminarPlanilla, planillajeLoader } from '../api/planillaje'
import { useLoaderData } from 'react-router-dom'
import ContenedorPlanillas from '../components/ContenedorPlanillas'
import { useAuth } from '../context/AuthContext'
import { TiquetesVendidos, obtenerTiquetesVendedidosPorPlanillaId } from '../api/tiquetes'
import { formatoHoraAmPm } from '../utils/utils'
import useToast from '../hooks/useToast'

type Inputs = {
    agencia: string,
    ruta: string,
    vehiculo: string,
    conductor: string,
    total: number,
    puestos: string,
    valorTiquete: number
}

interface TiqueteInfo {
    numeroTiquete: number;
    ruta: string,
    pasajeros: number;
    total: number,
    hora: string;
}

const columnas = [
    {
        name: 'Numero tiquete',
        selector: (row: TiqueteInfo) => row.numeroTiquete,
        sortable: true
    },
    {
        name: 'Ruta',
        selector: (row: TiqueteInfo) => row.ruta,
        sortable: true
    },
    {
        name: 'Pasajeros',
        selector: (row: TiqueteInfo) => row.pasajeros,
        sortable: true
    },
    {
        name: 'Total',
        selector: (row: TiqueteInfo) => row.total,
        sortable: true
    },
    {
        name: 'Hora',
        selector: (row: TiqueteInfo) => row.hora,
        sortable: true
    }
];

const Ventas = () => {
    const showToast = useToast();

    const { planilla: planillaEstado } = useAuth();
    const [tiquetesVendidos, setTiquetesVendidos] = useState<TiqueteInfo>();

    const obtenerTiquetesVendidos = async (id_ruta: number) => {
        try {
            const tiquetes = await obtenerTiquetesVendedidosPorPlanillaId(id_ruta) as TiquetesVendidos[];
            console.log({ tiquetes });

            // Inicializar la variable para la suma total de puestos ocupados
            let sumaPuestosOcupados = 0;
            const tiquetesTabla = tiquetes.map(tiquete => {
                sumaPuestosOcupados += tiquete.puestos_vendidos; // Actualizar la suma total
                return {
                    numeroTiquete: tiquete.id_tiquete,
                    ruta: `${planillaEstado.inicio_ruta} - ${planillaEstado.fin_ruta}`,
                    pasajeros: tiquete.puestos_vendidos,
                    total: tiquete.puestos_vendidos * planillaEstado.precio_ruta,
                    hora: formatoHoraAmPm(tiquete.fecha_hora)
                };
            });

            // Calcular puestos vacíos y si está lleno después de procesar todos los tiquetes
            const puestosVacios = planillaEstado.cantidad_puestos_vehiculo - sumaPuestosOcupados;
            const estaLleno = sumaPuestosOcupados === planillaEstado.cantidad_puestos_vehiculo;


            // Crear un objeto con las actualizaciones
            const updatedDetallesVenta = {
                ...detallesVenta,
                puestosVacios,
                estaLleno,
                estaDespachado: planillaEstado.viaje_completado,
                puestosOcupados: sumaPuestosOcupados,
            };

            setDetallesVenta(updatedDetallesVenta);


            setTiquetesVendidos(tiquetesTabla);
        } catch (error) {
            console.error("Error al obtener los tiquetes:", error);
        }
    };



    useEffect(() => {
        obtenerTiquetesVendidos(planillaEstado.id_planilla)
    }, [planillaEstado.id_planilla])


    const planillasData: PlanillajeTypes[] = useLoaderData() as PlanillajeTypes[];
    const [planillas, setPlanillas] = useState<PlanillajeTypes[]>(planillasData);


    const actualizarPlanillas = async () =>{
        const planillasActualizadas = await planillajeLoader();
        setPlanillas(planillasActualizadas)
    }

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Inputs>();

    const [detallesVenta, setDetallesVenta] = useState({
        valorTiquete: 0,
        puestosOcupados: 0,
        puestosVacios: 0,
        precioTotal: 0,
        cantidadTiquetes: 1,
        estaLleno: false,
        estaDespachado: planillaEstado.viaje_completado

    })

    const actualizarCantidadPuestos = (cantidad: number) => {
        setDetallesVenta((detallesVenta) => ({ ...detallesVenta, cantidadTiquetes: cantidad }));
    };

    const despacharVehiculo = async (id_planilla: number) => {
        const status_code = await despacharPlanilla(id_planilla)
        if (status_code === 200){
            actualizarPlanillas()
            showToast(`Vehiculo despachado`, 'success', 'bottom-center');
        }else{
            showToast('Error en la operacion', 'error', 'bottom-center');
        }

    }

    const establecerValoresFormulario = () => {
        if (planillaEstado.id_planilla !== 0) {
            setValue('agencia', planillaEstado.nombre_agencia);
            setValue('ruta', `${planillaEstado.inicio_ruta} ${planillaEstado.fin_ruta}`);
            setValue('vehiculo', planillaEstado.codigo_interno_vehiculo);
            setValue('conductor', `${planillaEstado.nombre_conductor} ${planillaEstado.apellido_conductor}`);
            setValue('total', planillaEstado.precio_ruta * detallesVenta.cantidadTiquetes);
            setValue('puestos', (detallesVenta.puestosOcupados + "/" + planillaEstado.cantidad_puestos_vehiculo));
            setValue('valorTiquete', planillaEstado.precio_ruta);
        } else {
            setValue('agencia', 'N/A');
            setValue('ruta', 'N/A');
            setValue('vehiculo', 'N/A');
            setValue('conductor', 'N/A');
            setValue('total', 0);
            setValue('puestos', (0 + "/" + 0));
            setValue('valorTiquete', 0);
        }
    }

    const anularPlanilla = async (id_planilla: number) =>{
        const statusCode = await eliminarPlanilla(id_planilla);
        if(statusCode === 204){
            actualizarPlanillas()
            showToast(`Planilla eliminada`, 'success', 'bottom-center');
        }else{
            showToast(`Error al eliminar planilla`, 'error', 'bottom-center')
        }
    }


    useEffect(() => {
        establecerValoresFormulario()

    }, [detallesVenta])


    return (
        <>
            <Card>
                <header>Ventas</header>
                <div className="contenedor">
                    <div className="derecha">

                        <div className="main">

                            <div className="main-left">
                                <div className="input-fields">
                                    <label htmlFor="agencia">Agencia</label>
                                    <input
                                        type="text"
                                        id="agencia"
                                        placeholder="Nombre de la agencia"
                                        disabled
                                        {...register("agencia")}
                                    />

                                </div>

                                <div className="input-fields">
                                    <label htmlFor="ruta">Ruta</label>
                                    <input
                                        type="text"
                                        id="ruta"
                                        placeholder="Nombre de la ruta"
                                        disabled
                                        {...register("ruta")}

                                    />

                                </div>

                                <div className="input-fields">
                                    <label htmlFor="vehiculo">Vehiculo</label>
                                    <input
                                        type="text"
                                        id="vehiculo"
                                        placeholder="Codigo del vehiculo"
                                        disabled
                                        {...register("vehiculo")}

                                    />

                                </div>




                                <div className="input-fields">
                                    <label htmlFor="total">TOTAL</label>
                                    <input
                                        type="number"
                                        id="total"
                                        placeholder="Valor total"
                                        disabled
                                        {...register("total")}

                                    />

                                </div>
                            </div>


                            <div className="main-right">
                                <div className="input-fields">

                                    <div className="grupo">

                                        <div className="hora">
                                            <label className='hora-titulo' htmlFor="inicioRuta">Hora</label>
                                            <DateTimeComponent type="time" />
                                        </div>
                                        <div className="fecha">
                                            <label className='fecha-titulo' htmlFor="inicioRuta">Fecha</label>
                                            <DateTimeComponent type="date" />

                                        </div>
                                    </div>



                                </div>

                                <div className="input-fields">
                                    <label htmlFor="conductor">Conductor</label>
                                    <input
                                        type="text"
                                        id="conductor"
                                        placeholder="Nombre del conductor"
                                        disabled
                                        {...register("conductor")}

                                    />

                                </div>

                                <div className="input-fields">
                                    <label htmlFor="puestos">P Ocupados / Disponibles</label>
                                    <input
                                        type="text"
                                        id="inicioRuta"
                                        placeholder="Puestos Ocupados"
                                        disabled
                                        {...register("puestos")}

                                    />

                                </div>

                                <div className="input-fields">
                                    <label htmlFor="valorTiquete">Valor tiquete</label>
                                    <input
                                        type="number"
                                        id="valorTiquete"
                                        placeholder="Valor tiquete"
                                        {...register("valorTiquete")}
                                    />

                                </div>

                                <label htmlFor="">Cantidad puestos</label>

                                <InputSpinner onChange={actualizarCantidadPuestos} maxCounter={detallesVenta.puestosVacios}/>



                                <button className={`${styles.btn} ${detallesVenta.estaDespachado || detallesVenta.estaLleno ? styles.desactivado : ''}`}>Crear tiquete</button>
                                <button className={`${styles.btn} ${detallesVenta.estaDespachado ? styles.desactivado : ''}`} onClick={() =>{despacharVehiculo(planillaEstado.id_planilla)}}>Despachar</button>
                                <button className={`${styles.btn}`} onClick={()=>{anularPlanilla(planillaEstado.id_planilla)}}>Anular Planilla</button>

                                <p>Esta despachado: {Boolean(detallesVenta.estaDespachado).toString()}</p>
<p>Esta lleno: {Boolean(detallesVenta.estaLleno).toString()}</p>


                            </div>
                        </div>
                        <Table columnas={columnas} datos={tiquetesVendidos} titulo='Tiquetes Vendidos' />

                    </div>
                    <div className="izquierda">

                        <ContenedorPlanillas planillas={planillas} />


                    </div>




                </div>
            </Card>
        </>
    )
}

export default Ventas

