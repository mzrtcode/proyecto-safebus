import Card from '../components/Card'
import { useForm } from "react-hook-form";
import Table from '../components/Table';
import { administradorTypes, actualizarAdministrador, desactivarAdministrador, resetearClave, administradorEliminar, administradoresLoader, administradorRegistrar } from '../api/administradores';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { formatearFecha } from '../api/general';
import Acciones from '../components/Acciones';
import useToast from '../hooks/useToast';
import { useEffect, useState } from 'react';
import Checkbox from '../components/Checkbox';
import styles from './administradores.module.css'

const Administradores = () => {

  const { id } = useParams();

  const { register, handleSubmit, setValue, reset, formState: {
    errors
  } } = useForm<administradorTypes>();
  const onSubmit = async (data: administradorTypes) => {
    try {
      if (!id) {
        const statusCode = await administradorRegistrar(data);
        if (statusCode === 201) {
          actualizaradministradores()
          showToast(`administrador  registrado`, 'success', 'bottom-center');
        } else {
          showToast('Error al registrar el administrador', 'error', 'bottom-center');
        }
      } else {
        const respuesta = await actualizarAdministrador(+id, data);
        if (respuesta) {
          actualizaradministradores()
          showToast(`administrador actualizado`, 'success', 'bottom-center');
        } else {
          showToast('Error al actualizar el administrador', 'error', 'bottom-center');
        }
      }
    } catch (error) {
      console.error(error);
      showToast('Error al registrar el administrador', 'error', 'bottom-center');
    }
  }

  const showToast = useToast();


  const administradoresData = useLoaderData() as administradorTypes[]
  const [administradores, setadministradores] = useState<administradorTypes[]>(administradoresData)

  const actualizaradministradores = async () => {
    const cargarNuevasadministradores = await administradoresLoader();
    setadministradores(cargarNuevasadministradores)
  }



  const eliminar = async (id: number): Promise<void> => {
    console.log('Eliminando el ID:', id);

    const seElimino = await administradorEliminar(id);
    if (seElimino) {
      actualizaradministradores()
      showToast('Se elimino el administrador', 'success', 'bottom-center')
    }
    else showToast('Error al eliminar el administrador', 'error', 'bottom-center');
  }

  const handleClickResetarClave = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (id) {
      const seReseteo = await resetearClave(+id)
      if (seReseteo) showToast('Se reseteo la clave del administrador', 'success', 'bottom-center');
      else showToast('Error al resetear la clave del administrador', 'error', 'bottom-center');
    }

  }

  useEffect(() => {
    if (id) {
      console.log('se detecto id')
      const administradorEditar = administradoresData.find(administrador => administrador.id_administrador === +id)
      if (administradorEditar) {
        setValue('nombres', administradorEditar.nombres)
        setValue('apellidos', administradorEditar.apellidos)
        setValue('correo', administradorEditar.correo)
        setValue('tipo_identificacion', administradorEditar.tipo_identificacion)
        setValue('numero_identificacion', administradorEditar.numero_identificacion)
        setValue('celular', administradorEditar.celular)
        setValue('fecha_nacimiento', administradorEditar.fecha_nacimiento.toISOString().substring(0, 10))
        setValue('direccion', administradorEditar.direccion)
      }

    } else reset()

  }, [id])

  const columnas = [
    {
      name: 'Nombres',
      selector: (row: administradorTypes) => row.nombres,
      sortable: true
    },
    {
      name: 'Apellidos',
      selector: (row: administradorTypes) => row.apellidos,
      sortable: true
    },
    {
      name: 'Correo',
      selector: (row: administradorTypes) => row.correo,
      sortable: true
    },
    {
      name: 'Tipo de Identificación',
      selector: (row: administradorTypes) => row.tipo_identificacion,
      sortable: true
    },
    {
      name: 'Número de Identificación',
      selector: (row: administradorTypes) => row.numero_identificacion,
      sortable: true
    },
    {
      name: 'Celular',
      selector: (row: administradorTypes) => row.celular,
      sortable: true
    },
    {
      name: 'Fecha de Nacimiento',
      selector: (row: administradorTypes) => formatearFecha(row.fecha_nacimiento),
      sortable: true
    },
    {
      name: 'Dirección',
      selector: 'direccion',
      sortable: true
    },
    {
      name: 'Estado',
      cell: (row: administradorTypes) => <Checkbox initialState={row.estado} onToggle={async () => {

        if (row.estado === true) {
          console.log('Cambié de estado mi es ID:', row.id_administrador);
          const seDesactivo = await desactivarAdministrador(row.id_administrador, row.estado)
          if (seDesactivo) showToast('Se desactivo el administrador', 'success', 'bottom-center');
          else showToast('Error al desactivar el administrador', 'error', 'bottom-center');
        } else if (row.estado === false) {
          const seActivo = await desactivarAdministrador(row.id_administrador, row.estado)
          if (seActivo) showToast('Se activo el administrador', 'success', 'bottom-center');
          else showToast('Error al desactivar el administrador', 'error', 'bottom-center');
        }


      }} />,
    },
    {
      name: 'Acciones',
      cell: (row: administradorTypes) => <Acciones editarLink={`/registros/administradores/${row.id_administrador}`} eliminar={eliminar} id={row.id_administrador} />
    }
  ];
  return (
    <Card>
      <header className={styles.header}>Registros 🛒</header>
      {id && (
        <div className={styles.buttons}>
          <button className={styles["save-button"]}>
            <span className={styles["button-text"]}><Link to="/registros/administradores">Nuevo administrador</Link></span>
            <i className='bx bx-plus-circle'></i>
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.details}>
          <span className={styles.title}>Administradores</span>
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
              {
                errors.nombres && <span className={styles["input-error"]}>Este campo es requerido</span>
              }
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
              {
                errors.apellidos && <span className={styles["input-error"]}>Este campo es requerido</span>
              }
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
              {
                errors.correo && <span className={styles["input-error"]}>Este campo es requerido</span>
              }
            </div>

            <div className={styles["input-fields"]}>
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

              {
                errors.tipo_identificacion && <span className={styles["input-error"]}>Este campo es requerido</span>
              }
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
              {
                errors.numero_identificacion && <span className={styles["input-error"]}>Este campo es requerido</span>
              }
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
              {
                errors.celular && <span className={styles["input-error"]}>Este campo es requerido</span>
              }
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
              {
                errors.fecha_nacimiento && <span className={styles["input-error"]}>Este campo es requerido</span>
              }
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
              {
                errors.direccion && <span className={styles["input-error"]}>Este campo es requerido</span>
              }
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles["save-button"]}>
            <span className={styles["button-text"]}>Guardar</span>
            <i className='bx bx-plus-circle'></i>
          </button>

          {
            id && (
              <button className={styles["save-button"]} onClick={handleClickResetarClave}>
                <span className={styles["button-text"]}>Restablecer Contraseña</span>
                <i className='bx bx-reset'></i>
              </button>
            )
          }
        </div>
      </form>

      <Table datos={administradores} columnas={columnas} titulo='Lista de administradores registrados' />
    </Card>

  )
}

export default Administradores