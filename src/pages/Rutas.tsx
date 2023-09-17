import Card from '../components/Card'
import { Controller, set, useForm } from "react-hook-form";
import styles from './rutas.module.css'
import Table from '../components/Table';
import Checkbox from '../components/Checkbox';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import Select, { StylesConfig } from 'react-select';
import { useEffect, useState } from 'react';
import { LocalidadesTypes, localidadesLoader } from '../api/localidades';
import { RutaRegistrar, RutaType, RutasTypes, actualizarRuta, desactivarRuta, eliminarRuta, obtenerRuta, rutaRegistrar, rutasLoader } from '../api/rutas';
import CurrencyInput from 'react-currency-input-field';
import useToast from '../hooks/useToast';
import Acciones from '../components/Acciones';
import { Options } from '../api/general';


const Rutas = () => {

  const { id } = useParams();
  const [localidadesOptions, setLocalidadesOptions] = useState<Options[]>([]);
  const [ruta, setRuta] = useState<RutaType>();
  const { register, handleSubmit, control, reset , setValue, formState: {
    errors,
  } } = useForm<RutaRegistrar>();
  // Uso de useLoaderData con el tipo esperado
  const rutasData:RutasTypes[] = useLoaderData() as RutasTypes[];
  const [rutas, setRutas] = useState<RutasTypes[]>(rutasData)

  const actualizarRutas = async () => {
      const cargarNuevasRutas = await rutasLoader();
      setRutas(cargarNuevasRutas)
  }


  let SelectInicio = { value: 'none', label: 'Selecciona' };
  let SelectFin = { value: 'none', label: 'Selecciona' };
  const [costo, setCosto] = useState(0)



  useEffect(() => {
    if (id) {
      console.log('se detecto id')
      const rutaEditar = rutasData.find(ruta => ruta.id_ruta === +id)
      if (rutaEditar) {
        SelectInicio = { value: rutaEditar.inicio_ruta.toString(), label: rutaEditar.nombre_inicio };
        SelectFin = { value: rutaEditar.fin_ruta.toString(), label: rutaEditar.nombre_fin };
        setCosto(rutaEditar.costo)
        setValue('inicio_ruta', SelectInicio)
        setValue('fin_ruta', SelectFin)
      }

    }else{
      reset()
      setCosto(0)
    }

  }, [id])






  const showToast = useToast();

  const obtenerLocalidades = async () => {
    try {
      const localidades = await localidadesLoader() as LocalidadesTypes[];
      const respuesta: Options[] = localidades.map(localidad => ({
        value: localidad.id_localidad,
        label: localidad.nombre,
      }));

      setLocalidadesOptions(respuesta);
    } catch (error) {
      console.error("Error al obtener localidades:", error);
    }
  };

  useEffect(() => {
    obtenerLocalidades()
  }, [])




  const onSubmit = async (data: RutaRegistrar) => {
    try {
      const inicioRutaValue = data.inicio_ruta.value;
      const finRutaValue = data.fin_ruta.value;

      if(inicioRutaValue === finRutaValue){
        showToast(`Las localidades deben ser diferentes`, 'warning', 'bottom-center');
        return
      }
      
      const costoValue = data.costo.replace(/[$,"']/g, '');

      const updatedData = {
        ...data,
        inicio_ruta: inicioRutaValue,
        fin_ruta: finRutaValue,
        costo: +costoValue
      };

      console.log(updatedData);

      if (!id) {
        const statusCode = await rutaRegistrar(updatedData);
        if (statusCode === 201) {
          actualizarRutas()
          showToast(`Ruta registrada`, 'success', 'bottom-center');
        } else {
          showToast('Error al registrar la ruta', 'error', 'bottom-center');
        }
      } else {
        const seActualizo = await actualizarRuta(+id, updatedData);
        if (seActualizo) {
          actualizarRutas()
          showToast(`Ruta actualizada`, 'success', 'bottom-center');
        }else{
          showToast('Error al actualizar la ruta', 'error', 'bottom-center');
        }
      }
    } catch (error) {
      console.error(error);
      showToast('Error al registrar la ruta', 'error', 'bottom-center');
    }
  };


  const eliminar = async (id: number): Promise<void> => {
    console.log('Eliminando el ID:', id);
    const seElimino = await eliminarRuta(id);
    if (seElimino) {
      actualizarRutas()
      showToast('Se elimino la ruta', 'success', 'bottom-center')
    }
    else showToast('Error al eliminar la ruta', 'error', 'bottom-center');
  }



  const columnas = [
    {
      name: 'ID',
      selector: (row: RutasTypes) => row.id_ruta,
    },
    {
      name: 'Inicio Ruta',
      selector: (row: RutasTypes) => row.nombre_inicio,
      sortable: true
    },
    {
      name: 'Fin Ruta',
      selector: (row: RutasTypes) => row.nombre_fin,
      sortable: true
    },
    {
      name: 'Costo',
      selector: (row: RutasTypes) => row.costo,
      sortable: true
    },

    {
      name: 'Estado',
      cell: (row: RutasTypes) => <Checkbox initialState={row.estado} onToggle={async () => {
        

        if (row.estado === true) {
          console.log('Cambié de estado mi es ID:', row.id_ruta);
          const seDesactivo = await desactivarRuta(row.id_ruta, row.estado)
          if (seDesactivo) {
            showToast('Se desactivo la ruta', 'success', 'bottom-center')
          }
          else showToast('Error al desactivar la ruta', 'error', 'bottom-center');
        } else if(row.estado === false) {
          const seActivo = await desactivarRuta(row.id_ruta, row.estado)
          if (seActivo) showToast('Se activo la ruta', 'success', 'bottom-center');
          else showToast('Error al desactivar la ruta', 'error', 'bottom-center');
        }


      }} />,
    },

    {
      name: 'Acciones',
      cell: (row: RutasTypes) => <Acciones editarLink={`/registros/rutas/${row.id_ruta}`} eliminar={eliminar} id={row.id_ruta} />
    }
  ];



  const customStyles = {
    control: base => ({
      ...base,
      height: '42px',
      border: '1px solid #aaa',
      zIndex: '9999'
    })
  };

  const handleOnValueChange = (value: number) => {
    // Actualiza el estado con el valor del costo
    setCosto(value);
  };


  return (
    <Card>
      <header>Registros 🗺️</header>
      {
        id &&
        <div className={styles.buttons}>
           <button className={styles["save-button"]}>
            <span className="button-text"><Link to="/registros/rutas">Nueva Ruta </Link></span>
            <i className='bx bx-plus-circle'></i>
          </button>
        </div>
      }

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${styles.details} ${styles.personal}`}>
          <span className={styles.title}>Rutas</span>

          <div className={styles.fields}>
            <div className={styles['input-fields']}>
              <label htmlFor="inicioRuta">Inicio Ruta</label>


              <Controller
                name="inicio_ruta"
                control={control}
                rules={{ required: true }} // Reglas de validación
                render={({ field }) => (
                  <Select
                    className={styles['select']}
                    styles={customStyles}
                    isClearable={true}
                    options={localidadesOptions}
                    {...field}
                  />
                )}
              />



              {errors.inicio_ruta && <span className="input-error">Este campo es requerido</span>}
            </div>

            <div className={styles['input-fields']}>
              <label htmlFor="finRuta">Fin de Ruta</label>
              <Controller
                name="fin_ruta"
                control={control}
                rules={{ required: true }} // Reglas de validación
                render={({ field }) => (
                  <Select
                    className={styles['select']}
                    styles={customStyles}
                    isClearable={true}
                    options={localidadesOptions}
                    {...field}
                  />
                )}
              />
              {errors.fin_ruta && <span className="input-error">Este campo es requerido</span>}
            </div>



            <div className={styles['input-fields']}>
              <label htmlFor="costo">Costo</label>
              <CurrencyInput
                id="costo"
                value={costo}
                onValueChange={handleOnValueChange}
                placeholder="Ingrese el costo"
                allowDecimals={false}
                {...register("costo", {
                  required: true,
                })}
              />




              {errors.costo && <span className="input-error">Este campo es requerido</span>}
            </div>

          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles['save-button']}>
            <span className={styles['button-text']}>Guardar</span>
            <i className='bx bx-plus-circle'></i>
          </button>
        </div>



      </form>

      <Table datos={rutas} titulo="Lista de rutas registradas" columnas={columnas} />
    </Card>
  )
}

export default Rutas

