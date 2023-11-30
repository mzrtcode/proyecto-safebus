import { Controller, useForm } from "react-hook-form";
import CardContainer from "../components/CardContainer"
import { PlanillaRegistrar, PlanillajeTypes, despacharPlanilla, planillaRegistrar } from "../api/planillaje";
import { useEffect, useState, useRef } from "react";
import { AgenciaTypes, agenciasLoader, obtenerAgencia } from "../api/agencias";
import { ConductorTypes, conductoresLoader } from "../api/conductores";
import { RutasTypes, rutasLoader } from "../api/rutas";
import { VehiculoTypes, vehiculosLoader } from "../api/vehiculos";
import styles from './planillaje.module.css'
import Select, { StylesConfig } from 'react-select';
import { Options } from "../api/general";
import useToast from '../hooks/useToast';
import { useAuth } from "../context/AuthContext";
import Planilla, { PlanillaProps } from "../components/Planilla";
import { calcularHoraSalida, formatearNumeroConComas, obtenerFecha, obtenerFechaYHoraActual } from "../utils/utils";
import { obtenerEmpresa } from "../api/empresa";
import { obtenerPropietario } from "../api/propietarios";
import { useReactToPrint } from "react-to-print";

function Planillaje() {

  const { register, handleSubmit, setValue, reset, control, watch, formState: {
    errors,
  } } = useForm<PlanillaRegistrar>();

  const { planilla: planillaEstado, empresa: empresaEstado, usuario: despachador, asignarEmpresa } = useAuth();
  const { usuario } = useAuth()

  const [rutas, setRutas] = useState<RutasTypes[]>([])
  const [agencias, setAgencias] = useState<AgenciaTypes[]>([])
  const [conductores, setConductores] = useState<ConductorTypes[]>([])
  const [vehiculos, setVehiculos] = useState<VehiculoTypes[]>([])

  const obtenerRutas = async () => {
    try {
      const rutas = await rutasLoader() as RutasTypes[];
      const rutasActivas = rutas.filter(ruta => ruta.estado === true)
      setRutas(rutasActivas);
    } catch (error) {
      console.error("Error al obtener Rutas:", error);
    }
  }
  const planillaRef = useRef(null);

  const generarOptionsRutas = (rutas: RutasTypes[]) => {
    const respuesta: Options[] = rutas.map(agencia => ({
      value: agencia.id_ruta,
      label: agencia.nombre_inicio + '-' + agencia.nombre_fin
    }));
    return respuesta;
  }

  const obtenerAgencias = async () => {
    try {
      const agencias = await agenciasLoader() as AgenciaTypes[];
      const agenciasActivas = agencias.filter(agencia => agencia.estado === true)

      setAgencias(agenciasActivas);
    } catch (error) {
      console.error("Error al obtener Agencias:", error);
    }
  }

  const generarOptionsAgencias = (agencias: AgenciaTypes[]) => {
    const respuesta: Options[] = agencias.map(agencia => ({
      value: agencia.id_agencia,
      label: agencia.nombre
    }));
    return respuesta;
  }


  const obtenerConductores = async () => {
    try {
      const conductores = await conductoresLoader() as ConductorTypes[];
      const respuesta: Options[] = conductores.map(conductor => ({
        value: conductor.id_conductor,
        label: conductor.nombres + ' ' + conductor.apellidos
      }));

      setConductores(respuesta);
    } catch (error) {
      console.error("Error al obtener Conductores:", error);
    }
  }

  const obtenerVehiculos = async () => {
    try {
      const vehiculos = await vehiculosLoader() as VehiculoTypes[];
      console.log(vehiculos)
      setVehiculos(vehiculos);
      return vehiculos;

    } catch (error) {
      console.error("Error al obtener Conductores:", error);
    }
  }

  // Función para crear el formato de mapeo
  const formatearListaVehiculosSelect = (vehiculos: VehiculoTypes[]) => {
    return vehiculos.map(vehiculo => ({
      value: vehiculo.id_vehiculo,
      label: vehiculo.codigo_interno + ' - ' + vehiculo.placa
    }));
  }

  const handlePrint = useReactToPrint({
    content: () => planillaRef.current,
  });




  useEffect(() => {
    obtenerRutas();
    obtenerConductores();
    obtenerVehiculos();
    obtenerAgencias();
    obtenerDatosEmpresa();
  }, [])

  useEffect(() => {
    setDatosPlanilla(generarDatosPlanilla())
  }, [empresaEstado])


  const generarDatosPlanilla = () => {
    return {
      razon_social: empresaEstado?.razon_social || 'N/A',
      nit: empresaEstado.nit,
      telefono: empresaEstado.telefono,
      direccionEmpresa: empresaEstado.direccion,
      direccionAgencia: 'N/A',
      fechaCreacion: obtenerFecha(new Date()),
      fechaImpresion: obtenerFechaYHoraActual(),
      numeroPlanilla: 0,
      agencia: 'N/A',
      despachador: despachador.nombres,
      horaSalida: calcularHoraSalida(new Date),
      ruta: 'N/A',
      vehiculoPlaca: planillaEstado.numero_placa_vehiculo,
      vehiculoCodigo: planillaEstado.codigo_interno_vehiculo,
      puestos: 0,
      vehiculoPropietario: 'N/A',
      total: '0',
      costoPlanilla: '0',
      conductor: 'N/A',
      fondoReposicion: formatearNumeroConComas(empresaEstado?.fondo_reposicion),
      totalDeducciones: '0',
      netoPlanilla: '0'
    }
  }

  const [datosPlanilla, setDatosPlanilla] = useState(generarDatosPlanilla());

  const onSubmit = async (data: PlanillaRegistrar) => {
    try {
      const idAgenciaValue = data.id_agencia?.value;
      const idRutaValue = data.id_ruta?.value;
      const idConductorValue = data.id_conductor?.value;
      const idVehiculoValue = data.id_vehiculo?.value;

      const updatedData = {
        ...data,
        id_ruta: idRutaValue,
        id_conductor: idConductorValue,
        id_agencia: idAgenciaValue,
        id_vehiculo: idVehiculoValue,
        id_vendedor: usuario?.id_usuario
      }

      const respuesta = await planillaRegistrar(updatedData)
      if (respuesta.status === 201) {
        setDatosPlanilla({
          ...datosPlanilla,
          numeroPlanilla:  respuesta.data.id_planilla
        })
        
        showToast(`Planilla registrada`, 'success', 'bottom-center');
        // Espera 100 milisegundos antes de imprimir
        setTimeout(() => {
          handlePrint();
        }, 100);
      } else {
        showToast('Error al registrar la planilla', 'error', 'bottom-center');
      }


    } catch (e) {
      console.log(e)
      showToast('Error al registrar la planilla', 'error', 'bottom-center');
    }
  }
  const showToast = useToast();



  const obtenerDatosEmpresa = async () => {
    const datos = await obtenerEmpresa();

    if (datos !== null) {
      asignarEmpresa(datos);
      console.log(datos)
    }
  }
 

  const customStyles = {
    control: base => ({
      ...base,
      height: '42px',
      border: '1px solid #aaa',
      /*  zIndex: '9999' */
    })
  };


  


  useEffect(() => {
    // Observa cambios en el campo id_ruta
    const idRutaSeleccionada = watch('id_ruta');

    const ruta = rutas.find(ruta => ruta.id_ruta === idRutaSeleccionada?.value);


    // Realiza la lógica de actualización del estado de datosPlanilla
    if (idRutaSeleccionada) {
      setDatosPlanilla((prevDatosPlanilla) => ({
        ...prevDatosPlanilla,
        ruta: idRutaSeleccionada.label || 'N/A',
        tarifa: ruta?.costo || 0,
      }));
    }
  }, [watch('id_ruta')]);

  useEffect(() => {
    // Observa cambios en el campo id_conductor
    const idConductorSeleccionado = watch('id_conductor');

    // Realiza la lógica de actualización del estado de datosPlanilla
    if (idConductorSeleccionado) {
      setDatosPlanilla((prevDatosPlanilla) => ({
        ...prevDatosPlanilla,
        conductor: idConductorSeleccionado.label || 'N/A',  // Actualiza según tu lógica
      }));
    }
  }, [watch('id_conductor')]);

  useEffect(() => {
    // Observa cambios en el campo id_vehiculo
    const idVehiculoSeleccionado = watch('id_vehiculo');

    // Realiza la lógica de actualización del estado de datosPlanilla
    const actualizarDatosVehiculo = async () => {
      if (idVehiculoSeleccionado) {
        // Obtener el ID del vehículo seleccionado
        const idVehiculo = idVehiculoSeleccionado.value;

        // Obtener el ID del propietario asociado al vehículo
        const idPropietario = vehiculos.find(vehiculo => vehiculo.id_vehiculo === idVehiculo)?.id_propietario;
        let nombrePropietario = 'N/A';

        // Obtener la información adicional del vehículo (placa y código interno)
        const vehiculo = vehiculos.find(vehiculo => vehiculo.id_vehiculo === idVehiculo);
        const placa = vehiculo?.placa;
        const codigoInterno = vehiculo?.codigo_interno;

        // Obtener el nombre completo del propietario si el ID del propietario no es undefined
        if (idPropietario !== undefined) {
          const propietario = await obtenerPropietario(idPropietario);
          nombrePropietario = `${propietario?.nombres} ${propietario?.apellidos}`;
        }

        // Actualizar el estado con la información del vehículo y propietario
        setDatosPlanilla((prevDatosPlanilla) => ({
          ...prevDatosPlanilla,
          vehiculoCodigo: codigoInterno !== undefined ? codigoInterno : 'N/A',
          vehiculoPlaca: placa !== undefined ? placa : 'N/A',
          vehiculoPropietario: nombrePropietario,
          puestos: vehiculo?.cantidad_puestos || 0,
        }));
      }
    };

    actualizarDatosVehiculo();
  }, [watch('id_vehiculo')]);

  useEffect(() => {
    // Observa cambios en el campo id_agencia
    const idAgenciaSeleccionada = watch('id_agencia');
    const idAgencia = +idAgenciaSeleccionada?.value;
    const direccionAgencia = agencias.find(agencia => agencia.id_agencia === idAgencia)?.direccion;


    // Realiza la lógica de actualización del estado de datosPlanilla
    const actualizarDatosAgencia = () => {
      if (idAgenciaSeleccionada) {
        setDatosPlanilla((prevDatosPlanilla) => ({
          ...prevDatosPlanilla,
          agencia: idAgenciaSeleccionada.label || 'N/A',
          direccionAgencia: direccionAgencia || 'N/A',

        }));
      }
    };

    actualizarDatosAgencia();
  }, [watch('id_agencia')]);


  // Calcular total
  useEffect(() => {
    const tarifa = +datosPlanilla.tarifa;
    const puestos = +datosPlanilla.puestos;
    const total = tarifa * puestos;
    const costoPlanilla = total * empresaEstado?.porcentaje_costo_planilla / 100
    const totalDeducciones = costoPlanilla + empresaEstado?.fondo_reposicion
    const netoPlanilla = total - totalDeducciones

    setDatosPlanilla((prevDatosPlanilla) => ({
      ...prevDatosPlanilla,
      total: formatearNumeroConComas(total),
      costoPlanilla: formatearNumeroConComas(costoPlanilla),
      totalDeducciones: formatearNumeroConComas(totalDeducciones),
      netoPlanilla: formatearNumeroConComas(netoPlanilla)
    }));
  }, [datosPlanilla.tarifa, datosPlanilla.puestos]);

 


  return (
    <CardContainer>
      <header className={styles.header}>Planillaje</header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${styles.details} ${styles.personal}`}>
          <span className={styles.title}>Agencias</span>

          <div className={styles.fields}>

            <div className={styles['input-fields']}>
              <label htmlFor="id_ruta" className={styles.label}>Ruta</label>

              <Controller
                name="id_ruta"
                control={control}
                rules={{ required: true }} // Reglas de validación
                render={({ field }) => (
                  <Select
                    className={styles.select}
                    styles={customStyles}
                    isClearable={true}
                    options={generarOptionsRutas(rutas)}
                    {...field}

                  />
                )}
              />
              {errors.id_ruta && <span className={styles['input-error']}>Este campo es requerido</span>}
            </div>

            <div className={styles['input-fields']}>
              <label htmlFor="id_conductor" className={styles.label}>Conductor</label>

              <Controller
                name="id_conductor"
                control={control}
                rules={{ required: true }} // Reglas de validación
                render={({ field }) => (
                  <Select
                    className={styles.select}
                    styles={customStyles}
                    isClearable={true}
                    options={conductores}
                    {...field}
                  />
                )}
              />
              {errors.id_conductor && <span className={styles['input-error']}>Este campo es requerido</span>}
            </div>

            <div className={styles['input-fields']}>
              <label htmlFor="id_vehiculo" className={styles.label}>Vehiculo</label>

              <Controller
                name="id_vehiculo"
                control={control}
                rules={{ required: true }} // Reglas de validación
                render={({ field }) => (
                  <Select
                    className={styles.select}
                    styles={customStyles}
                    isClearable={true}
                    options={formatearListaVehiculosSelect(vehiculos)}
                    {...field}


                  />
                )}
              />
              {errors.id_vehiculo && <span className={styles['input-error']}>Este campo es requerido</span>}
            </div>

            <div className={styles['input-fields']}>
              <label htmlFor="id_agencia" className={styles.label}>Agencia</label>

              <Controller
                name="id_agencia"
                control={control}
                rules={{ required: true }} // Reglas de validación
                render={({ field }) => (
                  <Select
                    className={styles.select}
                    styles={customStyles}
                    isClearable={true}
                    options={generarOptionsAgencias(agencias)}
                    {...field}

                  />
                )}
              />
              {errors.id_agencia && <span className={styles['input-error']}>Este campo es requerido</span>}
            </div>

          </div>
        </div>

        <div className={styles.buttons}>
          <button className={`${styles['save-button']} ${styles.button}`}>
            <span className={styles['button-text']}>Guardar</span>
            <i className={`bx bx-plus-circle ${styles.icon}`}></i>
          </button>
        </div>
      </form>
      <div ref={planillaRef}>
        <Planilla datos={datosPlanilla} />
      </div>
    </CardContainer>

  )
}
export default Planillaje