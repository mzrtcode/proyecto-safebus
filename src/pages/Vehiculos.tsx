import Card from '../components/Card'
import { Controller, useForm } from "react-hook-form";
import Table from '../components/Table';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { VehiculoRegistrar, VehiculoTypes, actualizarVehiculo, vehiculoEliminar, vehiculoRegistrar } from '../api/vehiculos';
import Select, { StylesConfig } from 'react-select';
import useToast from '../hooks/useToast';
import Acciones from '../components/Acciones';
import { useEffect, useState } from 'react';
import { PropietarioTypes, propietariosLoader } from '../api/propietarios';
import { Options } from '../api/general';


const Vehiculos = () => {

  const { id } = useParams();
  const [propietariosOptions, setPropitariosOptions] = useState<Options[]>([]);
  const { register, handleSubmit, setValue, reset ,control, formState: {
    errors
  } } = useForm<VehiculoRegistrar>();

  const showToast = useToast();

  const onSubmit = async (data: VehiculoRegistrar) => {
    try {
      const idPropietarioValue = data.id_propietario.value;
      const updatedData = {
        ...data,
        id_propietario: idPropietarioValue
      };

      console.log(updatedData)

      if (!id) {
        const statusCode = await vehiculoRegistrar(updatedData);
        if (statusCode === 201) {
          showToast(`Vehiculo registrado`, 'success', 'bottom-center');
        } else {
          showToast('Error al registrar el vehiculo', 'error', 'bottom-center');
        }
      } else {
        const respuesta = await actualizarVehiculo(+id, data);
        if (respuesta) {
          showToast(`Vehiculo actualizado`, 'success', 'bottom-center');
        }
      }
    } catch (error) {
      console.error(error);
      showToast('Error al registrar el vehiculo', 'error', 'bottom-center');
    }
  };


  const obtenerPropietarios = async () => {
    try {
      const propietarios = await propietariosLoader() as PropietarioTypes[];
      const respuesta: Options[] = propietarios.map(propietario => ({
        value: propietario.id_propietario,
        label: `${propietario.nombres} ${propietario.apellidos} - ${propietario.numero_identificacion}`
      }));
      console.log({ propietarios })
      setPropitariosOptions(respuesta);
    } catch (error) {
      console.error("Error al obtener propietarios:", error);
    }
  };

  useEffect(() => {
    obtenerPropietarios()
  }, [])


  const eliminar = async (id: number): Promise<void> => {
    console.log('Eliminando el ID:', id);

    const seElimino = await vehiculoEliminar(id);
    if (seElimino) showToast('Se elimino el vehiculo', 'success', 'bottom-center');
    else showToast('Error al eliminar el vehiculo', 'error', 'bottom-center');
  }
  const vehiculosData = useLoaderData() as VehiculoTypes[]
  const customStyles = {
    control: base => ({
      ...base,
      height: '42px',
      border: '1px solid #aaa',
      zIndex: '9999'
    })
  };
  useEffect(() => {
    if (id) {
      console.log('se detecto id')
      const vehiculoEditar = vehiculosData.find(vehiculo => vehiculo.id_vehiculo === +id)
      if (vehiculoEditar) {
        setValue('id_propietario', { label: `${vehiculoEditar.nombres_propietario} ${vehiculoEditar.apellidos_propietario} - ${vehiculoEditar.numero_identificacion_propietario}`, value: vehiculoEditar.id_propietario })
        setValue('placa', vehiculoEditar.placa)
        setValue('marca', vehiculoEditar.marca)
        setValue('modelo', vehiculoEditar.modelo)
        setValue('color', vehiculoEditar.color)
        setValue('anio_fabricacion', vehiculoEditar.anio_fabricacion)
        setValue('codigo_interno', vehiculoEditar.codigo_interno)
        setValue('cantidad_puestos', vehiculoEditar.cantidad_puestos)
      }

    }else reset()

  }, [id])

  const columnas = [
    {
      name: 'Propietario',
      selector: (row: VehiculoTypes) => row.id_propietario,
      sortable: true
    },
    {
      name: 'Placa',
      selector: (row: VehiculoTypes) => row.placa,
      sortable: true
    },
    {
      name: 'Marca',
      selector: (row: VehiculoTypes) => row.marca,
      sortable: true
    },
    {
      name: 'Modelo',
      selector: (row: VehiculoTypes) => row.modelo,
      sortable: true
    },
    {
      name: 'Color',
      selector: (row: VehiculoTypes) => row.color,
      sortable: true
    },
    {
      name: 'Año de Fabricación',
      selector: (row: VehiculoTypes) => row.anio_fabricacion,
      sortable: true
    },
    {
      name: 'Código Interno',
      selector: (row: VehiculoTypes) => row.codigo_interno,
      sortable: true
    },
    {
      name: 'Cantidad de Puestos',
      selector: (row: VehiculoTypes) => row.cantidad_puestos,
      sortable: true
    },
    {
      name: 'Acciones',
      cell: (row: VehiculoTypes) => <Acciones editarLink={`/registros/vehiculos/${row.id_vehiculo}`} eliminar={eliminar} id={row.id_vehiculo} />
    }
  ];
  return (
    <Card>
      <header>Registros 🚍</header>
      {
        id &&
        <div className="buttons">
          <button className="save-button">
            <span className="button-text"><Link to="/registros/vehiculos">Nuevo Vehiculo </Link></span>
            <i className='bx bx-plus-circle'></i>
          </button>
        </div>
      }

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="details personal">
          <span className="title">Vehiculos</span>

          <div className="fields">
            <div className="input-fields">
              <label htmlFor="id_propietario">Propietario</label>
              <Controller
                name="id_propietario"
                control={control}
                rules={{ required: true }} // Reglas de validación
                render={({ field }) => (
                  <Select
                    /* className={styles['select']} */
                    styles={customStyles}
                    isClearable={true}
                    options={propietariosOptions}
                    {...field}
                  />
                )}
              />
              {
                errors.id_propietario && <span className="input-error">Este campo es requerido</span>
              }
            </div>


            <div className="input-fields">
              <label htmlFor="placa">Placa</label>
              <input type="text" id='placa' placeholder='Ingrese la placa del vehículo' {...register('placa', {
                required: true,
                maxLength: 6
              })} />
              {
                errors.placa && <span className="input-error">Este campo es requerido</span>
              }
            </div>


            <div className="input-fields">
              <label htmlFor="marca">Marca</label>
              <input type="text" id='marca' placeholder='Ingrese la marca del vehículo' {...register('marca', {
                required: true,
              })} />
              {
                errors.marca && <span className="input-error">Este campo es requerido</span>
              }
            </div>

            <div className="input-fields">
              <label htmlFor="modelo">Modelo</label>
              <input type="text" id='modelo' placeholder='Ingrese el modelo del vehículo' {...register('modelo', {
                required: true,
              })} />
              {
                errors.modelo && <span className="input-error">Este campo es requerido</span>
              }
            </div>

            <div className="input-fields">
              <label htmlFor="color">Color</label>
              <input type="text" id='color' placeholder='Ingrese el color del vehículo' {...register('color', {
                required: true,
              })} />
              {
                errors.color && <span className="input-error">Este campo es requerido</span>
              }
            </div>

            <div className="input-fields">
              <label htmlFor="anio_fabricacion">Año de Fabricación</label>
              <input type="number" min="1900" max="2099" id='anio_fabricacion' placeholder='Ingrese el año de fabricación' {...register('anio_fabricacion', {
                required: true,
              })} />
              {
                errors.anio_fabricacion && <span className="input-error">Este campo es requerido</span>
              }
            </div>

            <div className="input-fields">
              <label htmlFor="codigo_interno">Código Interno</label>
              <input type="text" id='acronimo' placeholder='Ingrese el código interno' {...register('codigo_interno', {
                required: true,
              })} />
              {
                errors.codigo_interno && <span className="input-error">Este campo es requerido</span>
              }
            </div>

            <div className="input-fields">
              <label htmlFor="cantidad_puestos">Cantidad puestos</label>
              <input type="number" id='cantidad_puestos' placeholder='Ingrese el numero de puestos' {...register('cantidad_puestos', {
                required: true,
                maxLength: 3
              })} />
              {
                errors.cantidad_puestos && <span className="input-error">Este campo es requerido</span>
              }
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

      <Table columnas={columnas} datos={vehiculosData} titulo='Lista de vehiculos registrados' />
    </Card>
  )
}

export default Vehiculos