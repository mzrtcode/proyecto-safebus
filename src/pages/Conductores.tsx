import Card from '../components/Card'
import './conductores.css'


import { useForm } from "react-hook-form";
import Table from '../components/Table';
import { ConductorRegistrar, ConductorTypes, actualizarConductor, conductorEliminar, conductorRegistrar } from '../api/conductores';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { formatearFecha } from '../api/general';
import Acciones from '../components/Acciones';
import useToast from '../hooks/useToast';
import { useEffect } from 'react';

const Conductores = () => {

  const {id} = useParams();

  const { register, handleSubmit,setValue, reset, formState: {
    errors,
  } } = useForm<ConductorRegistrar>();
  const onSubmit = async (data:ConductorRegistrar) => {
    try {
      if (!id) {
        const statusCode = await conductorRegistrar(data);
        if (statusCode === 201) {
          showToast(`Conductor registrado`, 'success', 'bottom-center');
        } else {
          showToast('Error al registrar el conductor', 'error', 'bottom-center');
        }
      } else {
        const respuesta = await actualizarConductor(+id, data);
        if (respuesta) {
          showToast(`Conductor actualizada`, 'success', 'bottom-center');
        }
      }
    } catch (error) {
      console.error(error);
      showToast('Error al registrar el conductor', 'error', 'bottom-center');
    }
  }
  const showToast = useToast();

  const conductoresData = useLoaderData() as ConductorTypes[];
  const eliminar = async(id: number):Promise<void> => {
    console.log('Eliminando el ID:', id);

    const seElimino = await conductorEliminar(id);
    if(seElimino) showToast('Se elimino el conductor', 'success', 'bottom-center');
    else showToast('Error al eliminar el conductor', 'error', 'bottom-center');
  }

  useEffect(() => {
    if(id){
      console.log('se detecto id')
      const conductorEditar = conductoresData.find(conductor => conductor.id_conductor === +id)
      if (conductorEditar) {
        setValue('nombres', conductorEditar.nombres)
        setValue('apellidos', conductorEditar.apellidos)
        setValue('correo', conductorEditar.correo)
        setValue('tipo_identificacion', conductorEditar.tipo_identificacion)
        setValue('numero_identificacion', conductorEditar.numero_identificacion)
        setValue('celular', conductorEditar.celular)
        setValue('fecha_nacimiento', conductorEditar.fecha_nacimiento.toISOString().substring(0,10))
        setValue('direccion', conductorEditar.direccion)
      }
     
    }else reset()
      
  }, [id])

  
  const columnas = [
    {
      name: 'ID',
      selector: (row: ConductorTypes) => row.id_conductor,
      sortable: true
    },
    {
      name: 'Nombres',
      selector: (row: ConductorTypes) => row.nombres,
      sortable: true
    },
    {
      name: 'Apellidos',
      selector: (row: ConductorTypes) => row.apellidos,
      sortable: true
    },
    {
      name: 'Correo',
      selector: (row: ConductorTypes) => row.correo,
      sortable: true
    },
    {
      name: 'Tipo de Identificación',
      selector: (row: ConductorTypes) => row.tipo_identificacion,
      sortable: true
    },
    {
      name: 'Número de Identificación',
      selector: (row: ConductorTypes) => row.numero_identificacion,
      sortable: true
    },
    {
      name: 'Celular',
      selector: (row: ConductorTypes) => row.celular,
      sortable: true
    },
    {
      name: 'Fecha de Nacimiento',
      selector: (row: ConductorTypes) => formatearFecha(row.fecha_nacimiento),
      sortable: true
    },
    {
      name: 'Dirección',
      selector: (row: ConductorTypes) => row.direccion,
      sortable: true
    },
    {
      name: 'Acciones',
      selector: (row: ConductorTypes) => <Acciones editarLink={`/registros/conductores/${row.id_conductor}`} eliminar={eliminar} id={row.id_conductor} />
    }
  ];
  return (
    <Card>
      <header>Registros 🚗</header>
      {
            id && 
            <div className="buttons">
              <button className="save-button">
              <span className="button-text"><Link to="/registros/conductores">Nuevo Conductor </Link></span>
              <i className='bx bx-plus-circle'></i>
            </button>
            </div>
          }
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="details personal">
          <span className="title">Conductores</span>

          <div className="fields">
            <div className="input-fields">
              <label htmlFor="nombres">Nombres</label>
              <input type="text" id='nombres' placeholder='Ingrese sus nombres' {...register('nombres', {
                required: true,
              })} />
               {errors.nombres && <span className="input-error">Este campo es requerido</span>}
            </div>

            <div className="input-fields">
              <label htmlFor="apellidos">Apellidos</label>
              <input type="text" id='apellidos' placeholder='Ingrese sus apellidos' {...register('apellidos', {
                required: true,
              })} />
              {errors.apellidos && <span className="input-error">Este campo es requerido</span>}
            </div>

            <div className="input-fields">
              <label htmlFor="correo">Correo</label>
              <input type="email" id='correo' placeholder='Ejemplo: usuario@usuario.com' {...register('correo', {
                required: true,
              })} />
              {errors.correo && <span className="input-error">Este campo es requerido</span>}
            </div>

            <div className="input-fields">
              <label htmlFor="tipo_identificacion">Tipo de identificacion:</label>

              <select  id="tipo_identificacion" {...register('tipo_identificacion', {
                required: true,
              })} >
                <option value="">Seleccionar</option>
                <option value="C.C.">C.C.</option>
                <option value="T.I.">T.I.</option>
                <option value="C.E.">C.E.</option>
                <option value="Pasp.">Pasp.</option>
              </select>
           
              {errors.tipo_identificacion && <span className="input-error">Este campo es requerido</span>}
            </div>

            <div className="input-fields">
              <label htmlFor="numero_identificacion">Número de Identificación</label>
              <input type="number" id='numero_identificacion' placeholder='Ingrese el número de identificación' {...register('numero_identificacion', {
                required: true,
              })} />
              {errors.numero_identificacion && <span className="input-error">Este campo es requerido</span>}
            </div>

            <div className="input-fields">
              <label htmlFor="celular">Celular</label>
              <input type="number" id='celular' placeholder='Ingrese su número de celular' {...register('celular', {
                required: true,
              })} />
              {errors.celular && <span className="input-error">Este campo es requerido</span>}
            </div>

            <div className="input-fields">
              <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
              <input type="date" id='fecha_nacimiento' placeholder='Ingrese su fecha de nacimiento' {...register('fecha_nacimiento', {
                required: true,
              })} />
              {errors.fecha_nacimiento && <span className="input-error">Este campo es requerido</span>}
            </div>

            <div className="input-fields">
              <label htmlFor="direccion">Dirección</label>
              <input type="text" id='direccion' placeholder='Ingrese su dirección' {...register('direccion', {
                required: true,
              })} />
              {errors.direccion && <span className="input-error">Este campo es requerido</span>}
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

      <Table datos={conductoresData} columnas={columnas} titulo='Lista de concutores registrados' />
    </Card>
  )
}

export default Conductores