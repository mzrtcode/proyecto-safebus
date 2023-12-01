import { useReactToPrint } from "react-to-print";
import CardContainer from "../components/CardContainer"
import Table from "../components/Table"
import TiraPlanillaje from "../components/TiraPlanillaje";
import { useAuth } from "../context/AuthContext";
import { formatearNumeroConComas, formatoHoraAmPm, obtenerFecha } from "../utils/utils";
import styles from './reportes.module.css'
import { useEffect, useRef, useState } from 'react';
import { obtenerEmpresa } from "../api/empresa";
import { ReporteRelacionPlanillas, ReporteResumenPasajes, obtenerReporteRelacionPlanillas, obtenerReporteResumenPasajes } from "../api/reportes";
import { set } from "date-fns";


function Reportes() {

  interface ResumenPasajes {
    trayecto: string;
    cantidad: number,
    valor_total: number;
  }

  const tiraPlanillajeRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => tiraPlanillajeRef.current,
  });


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
      selector: (row: ResumenPasajes) => row.valor_total,
      sortable: true
    }
  ];



  interface RelacionPlanillas {
    planilla: string;
    vehiculo: string;
    trayecto: string;
    pasajeros: number;
    valor_total: number;
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
      selector: (row: RelacionPlanillas) => row.valor_total,
      sortable: true
    }
  ];

  const { planilla: planillaEstado, empresa: empresaEstado, asignarEmpresa } = useAuth();

  const [detallesVenta, setDetallesVenta] = useState({
    valorTiquete: 0,
    puestosOcupados: 0,
    puestosVacios: 0,
    precioTotal: 0,
    cantidadTiquetes: 1,
    estaLleno: false,
    estaDespachado: planillaEstado.viaje_completado
  })

  const obtenerDatosEmpresa = async () => {
    const datos = await obtenerEmpresa();

    if (datos !== null) {
      asignarEmpresa(datos);
    }
  }


  useEffect(() => {
    obtenerDatosEmpresa()
  }, [])

  
  const [tiqueteResumenPasajes, setTiqueteResumenPasajes] = useState  ([[]])
  const [tiqueteRelacionPlanillas, setTiqueteRelacionPlanillas] = useState([[]])

  const nuevaFecha = obtenerFecha(new Date);
  const horaActual = formatoHoraAmPm(new Date);
  const horaSalida = planillaEstado && planillaEstado.hora_salida
    ? `${planillaEstado.hora_salida.getHours()}:${planillaEstado.hora_salida.getMinutes()}` : 'N/A';


  const generarDatosTiquete = () => {
  
    return {
      razon_social: empresaEstado?.razon_social,
      nit: empresaEstado?.nit,
      telefono: empresaEstado?.telefono,
      direccionAgencia: planillaEstado?.direccion_agencia || 'N/A',
      direccionEmpresa: empresaEstado?.direccion,
      fecha: nuevaFecha,
      numeroTiquete: 0,
      agencia: planillaEstado.nombre_agencia || 'N/A',
      despachador: planillaEstado?.nombre_vendedor,
      horaSalida,
      ruta: `${planillaEstado?.inicio_ruta} - ${planillaEstado?.fin_ruta}`,
      tarifa: planillaEstado?.precio_ruta,
      vehiculoPlaca: planillaEstado?.numero_placa_vehiculo,
      vehiculoCodigo: planillaEstado?.codigo_interno_vehiculo,
      pasajes: detallesVenta?.cantidadTiquetes,
      total: planillaEstado?.precio_ruta * detallesVenta?.cantidadTiquetes,
      aseguradora: 'N/A',
      numeroPoliza: 'N/A',
      fechaImpresion: horaActual,
      mensaje: '* Gracias por su compra *',
      webEmpresa: 'www.empresa.com',
      datosResumenPasajes: tiqueteResumenPasajes,
      datosRelacionPlanillas: tiqueteRelacionPlanillas,
      totalCantidadTiqueteado: datosResumenPasajes.reduce((acumulador, item) => acumulador + +item.total_puestos_vendidos, 0),
      totalTiqueteadoValor: formatearNumeroConComas(datosResumenPasajes.reduce((acumulador, item) => acumulador + +item.total_costo, 0)),
      totalCantidadRelacionPlanillas:  datosRelacionPlanillas.reduce((acumulador, item) => acumulador + item.pasajes, 0),
      totalRelacionPlanillasValor : formatearNumeroConComas(datosRelacionPlanillas.reduce((acumulador, item) => acumulador + item.valor_total, 0)),
    };
  };

 const [datosResumenPasajes, setResumenPasajes] = useState<ReporteResumenPasajes[]>([]);
 const [datosRelacionPlanillas, setRelacionPlanillas] = useState<ReporteRelacionPlanillas[]>([]);


 const fechaHoy = new Date();
 const fechaStr = fechaHoy.toISOString().slice(0, 10);
 
 const [fecha, setFecha] = useState(fechaStr);
 const [datosTablaResumenPasajes, setDatosTablaResumenPasajes] = useState<ResumenPasajes[]>([]);
 const [datosTablaRelacionPlanillas, setDatosTablaRelacionPlanillas] = useState<RelacionPlanillas[]>([]);
 
 const obtenerInforme = async (fecha: string, setFunc: React.Dispatch<React.SetStateAction<any>>, obtenerReporteFunc: (fecha: string) => Promise<any>) => {
   try {
     const respuesta = await obtenerReporteFunc(fecha);
     setFunc(respuesta);
   } catch (error) {
     console.error(error);
     setFunc([]);
   }
 };
 
 const generarDatosTabla = (datos: any[], mapFunc: (item: any) => any, setFunc: React.Dispatch<React.SetStateAction<any[]>>) => {
   const resultado = datos.map(mapFunc);
   setFunc(resultado);
   return resultado;
 };
 
 useEffect(() => {
   obtenerInforme(fecha, setResumenPasajes, obtenerReporteResumenPasajes);
   obtenerInforme(fecha, setRelacionPlanillas, obtenerReporteRelacionPlanillas);
 }, [fecha]);
 
 useEffect(() => {
   generarDatosTabla(datosResumenPasajes, (item) => ({
     trayecto: `${item.id_ruta} ${item.ruta}`,
     cantidad: item.total_puestos_vendidos,
     valor_total: item.total_costo,
   }),setDatosTablaResumenPasajes);
 
   generarDatosTabla(datosRelacionPlanillas, (item) => ({
     planilla: item.id_planilla.toString(),
     vehiculo: item.placa,
     trayecto: item.id_ruta.toString(),
     pasajeros: item.pasajes,
     valor_total: item.valor_total
   }), setDatosTablaRelacionPlanillas);

   const datosResumenPasajesTiquete = datosResumenPasajes.map(item =>{
      return [`${item.id_ruta}-${item.ruta}`, item.total_puestos_vendidos, formatearNumeroConComas(+item.total_costo)]
   })

    const datosRelacionPlanillasTiquete= datosRelacionPlanillas.map(item =>{
        return [item.id_planilla.toString(), item.placa, item.id_ruta.toString(), item.pasajes.toString(), formatearNumeroConComas(item.valor_total)]
    })

    console.log(datosResumenPasajes)

    setTiqueteResumenPasajes(datosResumenPasajesTiquete)
    setTiqueteRelacionPlanillas(datosRelacionPlanillasTiquete)



 }, [datosResumenPasajes, datosRelacionPlanillas]);




  return (
    <CardContainer>
      <header className={styles.header}>Reportes 📄</header>

      <div className={styles["input-fields"]}>
        <label htmlFor="codigo_interno">Fecha</label>
        <input type="date" id="fecha" value={fecha} onChange={(evento) => {
          setFecha(evento.target.value)
        }}></input>
        {/*    {errors.codigo_interno && <span className={styles["input-error"]}>Este campo es requerido</span>} */}
      </div>


      <div>
        <h4>Resumen Pasajes</h4>
        <Table columnas={columnasResumenPasajes} datos={datosTablaResumenPasajes} />

        <h4>Relacion Planillas</h4>
        <Table columnas={columnasRelacionPlanillas} datos={datosTablaRelacionPlanillas} />



        <button onClick={() => {
          handlePrint()
        }}>Imprimir</button>




        <div ref={tiraPlanillajeRef}>
          <TiraPlanillaje datos={generarDatosTiquete()} ref={tiraPlanillajeRef} />
        </div>



      </div>
    </CardContainer>
  )
}

export default Reportes
