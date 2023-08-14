import Card from '../components/Card'
import { useForm } from "react-hook-form";
import Table from '../components/Table';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { AgenciaRegistrar, AgenciaTypes, actualizarAgencia, agenciaEliminar, agenciaRegistrar, agenciasLoader, desactivarAgencia } from '../api/agencias';
import Acciones from '../components/Acciones';
import useToast from '../hooks/useToast';
import { useEffect, useState } from 'react';
import Checkbox from '../components/Checkbox';


const Agencias = () => {

  const { id } = useParams()

  const { register, handleSubmit, setValue, reset, formState: {
    errors,
  } } = useForm<AgenciaRegistrar>();

  const onSubmit = async (data: AgenciaRegistrar) => {
    try {
      if (!id) {
        const statusCode = await agenciaRegistrar(data);
        console.log('aaaaaaaaaaaaaaa')
        console.log(statusCode)
        if (statusCode === 201) {
          actualizarAgencias()
          showToast(`Agencia registrada`, 'success', 'bottom-center');
        } else {
          showToast('Error al registrar la agencia', 'error', 'bottom-center');
        }
      } else {
        const respuesta = await actualizarAgencia(+id, data);
        if (respuesta) {
          actualizarAgencias()
          showToast(`Agencia actualizada`, 'success', 'bottom-center');
        }else{
          showToast('Error al actualizar la agencia', 'error', 'bottom-center');
        }
      }
    } catch (error) {
      console.error(error);
      showToast('Error al registrar la agencia', 'error', 'bottom-center');
    }
  }
  const showToast = useToast();


  const agenciasData = useLoaderData() as AgenciaTypes[]
  const [agencias, setAgencias] = useState<AgenciaTypes[]>(agenciasData)

  const actualizarAgencias = async () => {
      const cargarNuevasAgencias = await agenciasLoader();
      setAgencias(cargarNuevasAgencias)
  }

  
  const eliminar = async (id: number): Promise<void> => {
    console.log('Eliminando el ID:', id);

    const seElimino = await agenciaEliminar(id);
    if (seElimino) {
      actualizarAgencias()
      showToast('Se elimino la agencia', 'success', 'bottom-center')
    }
    else showToast('Error al eliminar la agencia', 'error', 'bottom-center');
  }

  useEffect(() => {
    if (id) {
      console.log('se detecto id')
      const agenciaEditar = agenciasData.find(agencia => agencia.id_agencia === +id)
      if (agenciaEditar) {
        setValue('nombre', agenciaEditar.nombre)
        setValue('direccion', agenciaEditar.direccion)
        setValue('codigo_interno', agenciaEditar.codigo_interno)
      }

    }else reset()

  }, [id])
  const columnas = [
    {
      name: 'Nombre localidad',
      selector: (row: AgenciaTypes) => row.nombre,
      sortable: true
    },
    {
      name: 'Dirección',
      selector: (row: AgenciaTypes) => row.direccion,
      sortable: true
    },
    {
      name: 'Código Interno',
      selector: (row: AgenciaTypes) => row.codigo_interno,
      sortable: true
    },
    {
      name: 'Estado',
      cell: (row: AgenciaTypes) => <Checkbox initialState={row.estado === 1} onToggle={async () => {
        const estadoAgencia = row.estado === 1

        if (estadoAgencia) {
          console.log('Cambié de estado mi es ID:', row.id_agencia);
          const seDesactivo = await desactivarAgencia(row.id_agencia, estadoAgencia)
          if (seDesactivo) showToast('Se desactivo la agencia', 'success', 'bottom-center');
          else showToast('Error al desactivar la agencia', 'error', 'bottom-center');
        } else {
          const seActivo = await desactivarAgencia(row.id_agencia, estadoAgencia)
          if (seActivo) showToast('Se activo la agencia', 'success', 'bottom-center');
          else showToast('Error al desactivar la agencia', 'error', 'bottom-center');
        }


      }} />,
    },
    {
      name: 'Acciones',
      cell: (row: AgenciaTypes) => <Acciones editarLink={`/registros/agencias/${row.id_agencia}`} eliminar={eliminar} id={row.id_agencia} />
    }
  ];
  return (
    <Card>
      <header>Registros 🏦</header>

      {
        id &&
        <div className="buttons">
          <button className="save-button">
            <span className="button-text"><Link to="/registros/agencias">Nueva Agencia </Link></span>
            <i className='bx bx-plus-circle'></i>
          </button>
        </div>
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="details personal">
          <span className="title">Agencias</span>

          <div className="fields">
            <div className="input-fields">
              <label htmlFor="nombre">Nombre localidad</label>
              <input type="text" id='nombre' placeholder='Ingrese el nombre de la agencia' {...register('nombre', {
                required: true,
                maxLength: 30
              })} />
              {errors.nombre && <span className="input-error">Este campo es requerido</span>}
            </div>

            <div className="input-fields">
              <label htmlFor="direccion">Dirección</label>
              <input type="text" id='direccion' placeholder='Ingrese la dirección de la agencia' {...register('direccion', {
                required: true,
              })} />
              {errors.direccion && <span className="input-error">Este campo es requerido</span>}
            </div>

            <div className="input-fields">
              <label htmlFor="codigo_interno">Codigo interno</label>
              <input type="text" id='codigo_interno' placeholder='Ejemplo: C2' {...register('codigo_interno', {
                required: true,
                maxLength: 2
              })} />
              {errors.codigo_interno && <span className="input-error">Este campo es requerido</span>}
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


      <Table datos={agencias} columnas={columnas} titulo='Lista de agencias registradas' />
    </Card>
  )
}

export default Agencias