import { Controller, useForm } from "react-hook-form";
import CardContainer from "../components/CardContainer"
import { PlanillaRegistrar, PlanillajeTypes, despacharPlanilla, planillaRegistrar } from "../api/planillaje";
import { useEffect, useState } from "react";
import { AgenciaTypes, agenciasLoader, obtenerAgencia } from "../api/agencias";
import { ConductorTypes, conductoresLoader } from "../api/conductores";
import { RutasTypes, rutasLoader } from "../api/rutas";
import { VehiculoTypes, vehiculosLoader } from "../api/vehiculos";
import styles from './planillaje.module.css'
import Select, { StylesConfig } from 'react-select';
import { Options } from "../api/general";
import useToast from '../hooks/useToast';
import { useAuth } from "../context/AuthContext";
import Planilla from "../components/Planilla";
import { obtenerFechaYHoraActual } from "../utils/utils";

function Planillaje() {

  const { register, handleSubmit, setValue, reset, control, formState: {
    errors,
  } } = useForm<PlanillaRegistrar>();

  const { usuario } = useAuth()

  const [rutas, setRutas] = useState<Options[]>()
  const [agencias, setAgencias] = useState<AgenciaTypes[]>()
  const [conductores, setConductores] = useState<ConductorTypes[]>()
  const [vehiculos, setVehiculos] = useState<VehiculoTypes[]>()

  const obtenerRutas = async () => {
    try {
      const rutas = await rutasLoader() as RutasTypes[];
      const rutasActivas = rutas.filter(ruta => ruta.estado === true)
      const respuesta: Options[] = rutasActivas.map(ruta => ({
        value: ruta.id_ruta,
        label: ruta.nombre_inicio + ' - ' + ruta.nombre_fin
      }));

      setRutas(respuesta);
    } catch (error) {
      console.error("Error al obtener Rutas:", error);
    }
  }

  const obtenerAgencias = async () => {
    try {
      const agencias = await agenciasLoader() as AgenciaTypes[];
      const agenciasActivas = agencias.filter(agencia => agencia.estado === true)
      const respuesta: Options[] = agenciasActivas.map(agencia => ({
        value: agencia.id_agencia,
        label: agencia.nombre
      }));

      setAgencias(respuesta);
    } catch (error) {
      console.error("Error al obtener Agencias:", error);
    }
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
      const respuesta: Options[] = vehiculos.map(vehiculo => ({
        value: vehiculo.id_vehiculo,
        label: vehiculo.codigo_interno + ' - ' + vehiculo.placa
      }));

      setVehiculos(respuesta);
    } catch (error) {
      console.error("Error al obtener Conductores:", error);
    }
  }

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

      const statusCode = await planillaRegistrar(updatedData)
      if (statusCode === 201) {
        showToast(`Planilla registrada`, 'success', 'bottom-center');
      } else {
        showToast('Error al registrar la planilla', 'error', 'bottom-center');
      }


    } catch (e) {
      console.log(e)
      showToast('Error al registrar la planilla', 'error', 'bottom-center');
    }
  }
  const showToast = useToast();


  useEffect(() => {
    obtenerRutas();
    obtenerConductores();
    obtenerVehiculos();
    obtenerAgencias();
  }, [])


  const customStyles = {
    control: base => ({
      ...base,
      height: '42px',
      border: '1px solid #aaa',
      /*  zIndex: '9999' */
    })
  };

  const { planilla: planillaEstado, empresa: empresaEstado, asignarEmpresa } = useAuth();

  const generarDatosPlanilla = () => {

    const datosTiquete = {
      razon_social: "ff",
      nit: empresaEstado.nit,
      telefono: empresaEstado.telefono,
      direccion: empresaEstado.direccion,
      direccionAgencia: 'Calle Agencia 123',
      fecha: 'Jun 09/2023',
      numeroTiquete: '11111123',
      agencia: '01 Popayan-Agencia',
      despachador: planillaEstado.nombre_vendedor,
      horaSalida: '19:24',
      ruta: `${planillaEstado.inicio_ruta} - ${planillaEstado.fin_ruta}`,
      tarifa: planillaEstado.precio_ruta,
      vehiculoPlaca: planillaEstado.numero_placa_vehiculo,
      vehiculoCodigo: planillaEstado.codigo_interno_vehiculo,
      pasajes: 1,
      total: 5000,
      aseguradora: 'Sura',
      numeroPoliza: '123456789',
      fechaImpresion: obtenerFechaYHoraActual(),
      mensaje: '* Gracias por su compra *',
      webEmpresa: 'www.empresa.com'
    }
    return datosTiquete;
  }
  const [datosTiquete, setDatosTiquete] = useState(generarDatosPlanilla());


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
                    options={rutas}
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
              {errors.id_ruta && <span className={styles['input-error']}>Este campo es requerido</span>}
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
                    options={vehiculos}
                    {...field}
                  />
                )}
              />
              {errors.id_ruta && <span className={styles['input-error']}>Este campo es requerido</span>}
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
                    options={agencias}
                    {...field}
                  />
                )}
              />
              {errors.id_ruta && <span className={styles['input-error']}>Este campo es requerido</span>}
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
    </CardContainer>

  )
}
export default Planillaje