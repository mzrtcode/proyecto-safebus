import { useForm } from "react-hook-form";
import Table from '../components/Table';
import CardContainer from "../components/CardContainer";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { PropietarioRegistrar, PropietarioTypes, actualizarPropietario, propietarioEliminar, propietarioRegistrar, propietariosLoader } from "../api/propietarios";
import { formatearFecha } from "../api/general";
import Acciones from "../components/Acciones";
import useToast from "../hooks/useToast";
import { useEffect, useState } from "react";
import styles from './propietarios.module.css'

const Propietarios = () => {

  const { id } = useParams();

  const { register, handleSubmit, setValue, reset, formState: {
    errors,
  } } = useForm<PropietarioRegistrar>();
  const onSubmit = async (data: PropietarioRegistrar) => {
    try {
      if (!id) {
        const statusCode = await propietarioRegistrar(data);
        if (statusCode === 201) {
          actualizarPropietarios()
          showToast(`Conductor registrado`, 'success', 'bottom-center');
        } else {
          showToast('Error al registrar el conductor', 'error', 'bottom-center');
        }
      } else {
        const respuesta = await actualizarPropietario(+id, data);
        if (respuesta) {
          actualizarPropietarios()
          showToast(`Conductor actualizada`, 'success', 'bottom-center');
        } else {
          showToast('Error al actualizar el conductor', 'error', 'bottom-center');
        }
      }
    } catch (error) {
      console.error(error);
      showToast('Error al registrar el conductor', 'error', 'bottom-center');
    }
  }
  const showToast = useToast();

  const propietariosData = useLoaderData() as PropietarioTypes[];
  const [propietarios, setPropietarios] = useState<PropietarioTypes[]>(propietariosData)

  const actualizarPropietarios = async () => {
    const cargarNuevasRutas = await propietariosLoader();
    setPropietarios(cargarNuevasRutas)
  }

  const eliminar = async (id: number): Promise<void> => {
    console.log('Eliminando el ID:', id);

    const seElimino = await propietarioEliminar(id);
    if (seElimino) {
      actualizarPropietarios()
      showToast('Se elimino el propietario', 'success', 'bottom-center')
    }
    else showToast('Error al eliminar el propietario', 'error', 'bottom-center');
  }
  useEffect(() => {
    if (id) {
      console.log('se detecto id')
      const propietarioEditar = propietariosData.find(propietario => propietario.id_propietario === +id)
      if (propietarioEditar) {
        setValue('nombres', propietarioEditar.nombres)
        setValue('apellidos', propietarioEditar.apellidos)
        setValue('correo', propietarioEditar.correo)
        setValue('tipo_identificacion', propietarioEditar.tipo_identificacion)
        setValue('numero_identificacion', propietarioEditar.numero_identificacion)
        setValue('celular', propietarioEditar.celular)
        setValue('fecha_nacimiento', propietarioEditar.fecha_nacimiento.toISOString().substring(0, 10))
        setValue('direccion', propietarioEditar.direccion)
      }

    } else reset()

  }, [id])

  const columnas = [
    {
      name: 'ID',
      selector: (row: PropietarioTypes) => row.id_propietario,
    },
    {
      name: 'Nombres',
      selector: (row: PropietarioTypes) => row.nombres,
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
    <CardContainer>
      <header className={styles.header}>Registros 🙎🏻‍♂️</header>
      {id && (
        <div className={styles.buttons}>
          <button className={styles["save-button"]}>
            <span className={styles["button-text"]}><Link to="/registros/propietarios">Nuevo Propietario</Link></span>
            <i className='bx bx-plus-circle'></i>
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.details}>
          <span className={styles.title}>Propietarios</span>
          <div className={styles.fields}>
            <div className={styles["input-fields"]}>
              <label htmlFor="nombres">Nombres</label>
              <input
                type="text"
                id="nombres"
                placeholder="Ingrese sus nombres"
                {...register('nombres', {
                  required: true,
                })}
              />
              {errors.nombres && <span className={styles["input-error"]}>Este campo es requerido</span>}
            </div>

            <div className={styles["input-fields"]}>
              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                id="apellidos"
                placeholder="Ingrese sus apellidos"
                {...register('apellidos', {
                  required: true,
                })}
              />
              {errors.apellidos && <span className={styles["input-error"]}>Este campo es requerido</span>}
            </div>

            <div className={styles["input-fields"]}>
              <label htmlFor="correo">Correo</label>
              <input
                type="email"
                id="correo"
                placeholder="Ejemplo: usuario@usuario.com"
                {...register('correo', {
                  required: true,
                })}
              />
              {errors.correo && <span className={styles["input-error"]}>Este campo es requerido</span>}
            </div>

            <div className={styles["input-fields"]}>
              <label htmlFor="tipo_identificacion">Tipo de identificacion:</label>
              <select
                id="tipo_identificacion"
                {...register('tipo_identificacion', {
                  required: true,
                })}
              >
                <option value="">Seleccionar</option>
                <option value="C.C.">C.C.</option>
                <option value="T.I.">T.I.</option>
                <option value="C.E.">C.E.</option>
                <option value="Pasp.">Pasp.</option>
              </select>
              {errors.tipo_identificacion && <span className={styles["input-error"]}>Este campo es requerido</span>}
            </div>

            <div className={styles["input-fields"]}>
              <label htmlFor="numero_identificacion">Número de Identificación</label>
              <input
                type="number"
                id="numero_identificacion"
                placeholder="Ingrese el número de identificación"
                {...register('numero_identificacion', {
                  required: true,
                })}
              />
              {errors.numero_identificacion && <span className={styles["input-error"]}>Este campo es requerido</span>}
            </div>

            <div className={styles["input-fields"]}>
              <label htmlFor="celular">Celular</label>
              <input
                type="text"
                id="celular"
                placeholder="Ingrese su número de celular"
                {...register('celular', {
                  required: true,
                })}
              />
              {errors.celular && <span className={styles["input-error"]}>Este campo es requerido</span>}
            </div>

            <div className={styles["input-fields"]}>
              <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
              <input
                type="date"
                id="fecha_nacimiento"
                placeholder="Ingrese su fecha de nacimiento"
                {...register('fecha_nacimiento', {
                  required: true,
                })}
              />
              {errors.fecha_nacimiento && <span className={styles["input-error"]}>Este campo es requerido</span>}
            </div>

            <div className={styles["input-fields"]}>
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                placeholder="Ingrese su dirección"
                {...register('direccion', {
                  required: true,
                })}
              />
              {errors.direccion && <span className={styles["input-error"]}>Este campo es requerido</span>}
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

      <Table datos={propietarios} columnas={columnas} titulo="Lista de propietarios registrados" />
    </CardContainer>

  )
}

export default Propietarios