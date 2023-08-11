import { useForm } from "react-hook-form";
import Table from '../components/Table';
import Card from "../components/Card";
import { useLoaderData, useParams } from "react-router-dom";
import { PropietarioRegistrar, PropietarioTypes, actualizarPropietario, propietarioEliminar, propietarioRegistrar } from "../api/propietarios";
import { formatearFecha } from "../api/general";
import Acciones from "../components/Acciones";
import useToast from "../hooks/useToast";
import { useEffect } from "react";

const Propietarios = () => {

  const {id} = useParams();

  const { register, handleSubmit,setValue, formState: {
    errors,
  } } = useForm<PropietarioRegistrar>();
  const onSubmit = async(data: PropietarioRegistrar) => {
    try {
      if (!id) {
        const statusCode = await propietarioRegistrar(data);
        if (statusCode === 201) {
          showToast(`Conductor registrado`, 'success', 'bottom-center');
        } else {
          showToast('Error al registrar el conductor', 'error', 'bottom-center');
        }
      } else {
        const respuesta = await actualizarPropietario(+id, data);
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

 const propietariosData = useLoaderData() as PropietarioTypes[];

 const eliminar = async(id: number):Promise<void> => {
  console.log('Eliminando el ID:', id);

  const seElimino = await propietarioEliminar(id);
  if(seElimino) showToast('Se elimino el propietario', 'success', 'bottom-center');
  else showToast('Error al eliminar el propietario', 'error', 'bottom-center');
}
useEffect(() => {
  if(id){
    console.log('se detecto id')
    const propietarioEditar = propietariosData.find(propietario => propietario.id_propietario === +id)
    if (propietarioEditar) {
      setValue('nombres', propietarioEditar.nombres)
      setValue('apellidos', propietarioEditar.apellidos)
      setValue('correo', propietarioEditar.correo)
      setValue('tipo_identificacion', propietarioEditar.tipo_identificacion)
      setValue('numero_identificacion', propietarioEditar.numero_identificacion)
      setValue('celular', propietarioEditar.celular)
      setValue('fecha_nacimiento', propietarioEditar.fecha_nacimiento.toISOString().substring(0,10))
      setValue('direccion', propietarioEditar.direccion)
    }
   
  }
    
}, [id])

  const columnas = [
    {
      name: 'ID',
      selector: (row: PropietarioTypes) => row.id_propietario,
    },
    {
      name: 'Nombres',
      selector:  (row: PropietarioTypes) => row.nombres,
      sortable: true
    },
    {
      name: 'Apellidos',
      selector: (row: PropietarioTypes) => row.apellidos,
      sortable: true
    },
    {
      name: 'Correo',
      selector: (row: PropietarioTypes) => row.correo,
      sortable: true
    },
    {
      name: 'Tipo de Identificación',
      selector: (row: PropietarioTypes) => row.tipo_identificacion,
      sortable: true
    },
    {
      name: 'Número de Identificación',
      selector: (row: PropietarioTypes) => row.numero_identificacion,
      sortable: true
    },
    {
      name: 'Celular',
      selector: (row: PropietarioTypes) => row.celular,
      sortable: true
    },
    {
      name: 'Fecha de Nacimiento',
      selector: (row: PropietarioTypes) => formatearFecha(row.fecha_nacimiento),
      sortable: true
    },
    {
      name: 'Dirección',
      selector: (row: PropietarioTypes) => row.direccion,
      sortable: true
    },
    {
      name: 'Acciones',
      selector: (row: PropietarioTypes) => <Acciones editarLink={`/registros/propietarios/${row.id_propietario}`} eliminar={eliminar} id={row.id_propietario} />
    }
  ];
  return (
    <Card>
      <header>Registros 🙎🏻‍♂️</header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="details personal">
          <span className="title">Propietarios</span>

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

              <select id="tipo_identificacion" {...register('tipo_identificacion', {
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
              <input type="text" id='celular' placeholder='Ingrese su número de celular' {...register('celular', {
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



        <button className="save-button">
          <span className="button-text">Guardar</span>
          <i className='bx bx-plus-circle'></i>
        </button>
      </form>

      <Table datos={propietariosData} columnas={columnas} titulo="Lista de propietarios registrados" />
    </Card>
  )
}

export default Propietarios