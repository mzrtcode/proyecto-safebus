import { Controller, useForm } from "react-hook-form";
import Card from "../components/Card"
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
    try{
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
      

    }catch(e){
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

  return (
    <Card>
      <header>Planillaje</header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="details personal">
          <span className="title">Agencias</span>

          <div className="fields">

            <div className="input-fields">
              <label htmlFor="id_ruta">Ruta</label>


              <Controller
                name="id_ruta"
                control={control}
                rules={{ required: true }} // Reglas de validación
                render={({ field }) => (
                  <Select
                    className={styles['select']}
                    styles={customStyles}
                    isClearable={true}
                    options={rutas}
                    {...field}
                  />
                )}
              />
              {errors.id_ruta && <span className="input-error">Este campo es requerido</span>}
            </div>

            <div className="input-fields">
              <label htmlFor="id_conductor">Conductor</label>


              <Controller
                name="id_conductor"
                control={control}
                rules={{ required: true }} // Reglas de validación
                render={({ field }) => (
                  <Select
                    className={styles['select']}
                    styles={customStyles}
                    isClearable={true}
                    options={conductores}
                    {...field}
                  />
                )}
              />
              {errors.id_ruta && <span className="input-error">Este campo es requerido</span>}
            </div>

            <div className="input-fields">
              <label htmlFor="id_vehiculo">Vehiculo</label>


              <Controller
                name="id_vehiculo"
                control={control}
                rules={{ required: true }} // Reglas de validación
                render={({ field }) => (
                  <Select
                    className={styles['select']}
                    styles={customStyles}
                    isClearable={true}
                    options={vehiculos}
                    {...field}
                  />
                )}
              />
              {errors.id_ruta && <span className="input-error">Este campo es requerido</span>}
            </div>

            <div className="input-fields">
              <label htmlFor="id_agencia">Agencia</label>


              <Controller
                name="id_agencia"
                control={control}
                rules={{ required: true }} // Reglas de validación
                render={({ field }) => (
                  <Select
                    className={styles['select']}
                    styles={customStyles}
                    isClearable={true}
                    options={agencias}
                    {...field}
                  />
                )}
              />
              {errors.id_ruta && <span className="input-error">Este campo es requerido</span>}
            </div>

          </div>
        </div>

        <div className="buttons">
          <button className="save-button">
            <span className="button-text">Guardar</span>
            <i className='bx bx-plus-circle'></i>
          </button>

        </div>
      </form>


    </Card>
  )
}
export default Planillaje