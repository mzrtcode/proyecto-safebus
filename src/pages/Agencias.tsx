import CardContainer from '../components/CardContainer'
import { useForm } from "react-hook-form";
import Table from '../components/Table';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { AgenciaRegistrar, AgenciaTypes, actualizarAgencia, agenciaEliminar, agenciaRegistrar, agenciasLoader, desactivarAgencia } from '../api/agencias';
import Acciones from '../components/Acciones';
import useToast from '../hooks/useToast';
import { useEffect, useState } from 'react';
import Checkbox from '../components/Checkbox';
import styles from './agencias.module.css'

const Agencias = () => {

  const { id } = useParams()

  const { register, handleSubmit, setValue, reset, formState: {
    errors,
  } } = useForm<AgenciaRegistrar>();

  const onSubmit = async (data: AgenciaRegistrar) => {
    try {
      if (!id) {
        const statusCode = await agenciaRegistrar(data);
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
        } else {
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

    } else reset()

  }, [id])
  const columnas = [
    {
      name: 'Nombre agencia',
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
      cell: (row: AgenciaTypes) => <Checkbox initialState={row.estado} onToggle={async () => {


        if (row.estado === true) {
          console.log('Cambié de estado mi es ID:', row.id_agencia);
          const seDesactivo = await desactivarAgencia(row.id_agencia, row.estado)
          if (seDesactivo) showToast('Se desactivo la agencia', 'success', 'bottom-center');
          else showToast('Error al desactivar la agencia', 'error', 'bottom-center');
        } else if (row.estado === false) {
          const seActivo = await desactivarAgencia(row.id_agencia, row.estado)
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
    <CardContainer>
      <header className={styles.header}>Registros 🏦</header>
      {id && (
        <div className={styles.buttons}>
          <button className={styles["save-button"]}>
            <span className={styles["button-text"]}><Link to="/registros/agencias">Nueva Agencia</Link></span>
            <i className='bx bx-plus-circle'></i>
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.details}>
          <span className={styles.title}>Agencias</span>
          <div className={styles.fields}>
            <div className={styles["input-fields"]}>
              <label htmlFor="nombre">Nombre Agencia</label>
              <input
                type="text"
                id="nombre"
                placeholder="Ingrese el nombre de la agencia"
                {...register('nombre', {
                  required: true,
                  maxLength: 30
                })}
              />
              {errors.nombre && <span className={styles["input-error"]}>Este campo es requerido</span>}
            </div>

            <div className={styles["input-fields"]}>
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                placeholder="Ingrese la dirección de la agencia"
                {...register('direccion', {
                  required: true,
                })}
              />
              {errors.direccion && <span className={styles["input-error"]}>Este campo es requerido</span>}
            </div>

            <div className={styles["input-fields"]}>
              <label htmlFor="codigo_interno">Codigo interno</label>
              <input
                type="text"
                id="codigo_interno"
                placeholder="Ejemplo: C2"
                {...register('codigo_interno', {
                  required: true,
                  maxLength: 2
                })}
              />
              {errors.codigo_interno && <span className={styles["input-error"]}>Este campo es requerido</span>}
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles["save-button"]}>
            <span className={styles["button-text"]}>Guardar</span>
            <i className='bx bx-plus-circle'></i>
          </button>
        </div>
      </form>

      <Table datos={agencias} columnas={columnas} titulo='Lista de agencias registradas' />
    </CardContainer>

  )
}

export default Agencias