import Card from '../components/Card'
import { useForm } from "react-hook-form";
import Table from '../components/Table';
import { VendedorTypes, actualizarVendedor, vendedorRegistrar } from '../api/vendedores';
import { useLoaderData, useParams } from 'react-router-dom';
import { formatearFecha } from '../api/general';
import Acciones from '../components/Acciones';
import useToast from '../hooks/useToast';
import { useEffect } from 'react';
import { vehiculoEliminar } from '../api/vehiculos';


const Vendedores = () => {

  const {id} = useParams();

  const { register, handleSubmit, setValue, formState: {
    errors
  } } = useForm<VendedorTypes>();
  const onSubmit = async(data: VendedorTypes) => {
    try {     
      if (!id) {
        const statusCode = await vendedorRegistrar(data);
        if (statusCode === 201) {
          showToast(`Vendedor  registrado`, 'success', 'bottom-center');
        } else {
          showToast('Error al registrar el vendedor', 'error', 'bottom-center');
        }
      } else {
        const respuesta = await actualizarVendedor(+id, data);
        if (respuesta) {
          showToast(`Vendedor actualizado`, 'success', 'bottom-center');
        }
      }
    } catch (error) {
      console.error(error);
      showToast('Error al registrar el vendedor', 'error', 'bottom-center');
    }
  }

  const showToast = useToast();


  const vendedoresData = useLoaderData() as VendedorTypes[]
  console.log(vendedoresData)

  const eliminar = async (id: number): Promise<void> => {
    console.log('Eliminando el ID:', id);

    const seElimino = await vehiculoEliminar(id);
    if (seElimino) showToast('Se elimino el vendedor', 'success', 'bottom-center');
    else showToast('Error al eliminar el vendedor', 'error', 'bottom-center');
  }

  useEffect(() => {
    if(id){
      console.log('se detecto id')
      const vendedorEditar = vendedoresData.find(vendedor => vendedor.id_vendedor === +id)
      if (vendedorEditar) {
        setValue('nombres', vendedorEditar.nombres)
        setValue('apellidos', vendedorEditar.apellidos)
        setValue('correo', vendedorEditar.correo)
        setValue('tipo_identificacion', vendedorEditar.tipo_identificacion)
        setValue('numero_identificacion', vendedorEditar.numero_identificacion)
        setValue('celular', vendedorEditar.celular)
        setValue('fecha_nacimiento', vendedorEditar.fecha_nacimiento.toISOString().substring(0,10))
        setValue('direccion', vendedorEditar.direccion)
      }
     
    }
      
  }, [id])

  const columnas = [
    {
      name: 'Nombres',
      selector: (row: VendedorTypes) => row.nombres,
      sortable: true
    },
    {
      name: 'Apellidos',
      selector: (row: VendedorTypes) => row.apellidos,
      sortable: true
    },
    {
      name: 'Correo',
      selector: (row: VendedorTypes) => row.correo,
      sortable: true
    },
    {
      name: 'Tipo de Identificación',
      selector: (row: VendedorTypes) => row.tipo_identificacion,
      sortable: true
    },
    {
      name: 'Número de Identificación',
      selector: (row: VendedorTypes) => row.numero_identificacion,
      sortable: true
    },
    {
      name: 'Celular',
      selector: (row: VendedorTypes) => row.celular,
      sortable: true
    },
    {
      name: 'Fecha de Nacimiento',
      selector: (row: VendedorTypes) => formatearFecha(row.fecha_nacimiento),
      sortable: true
    },
    {
      name: 'Dirección',
      selector: 'direccion',
      sortable: true
    },
    {
      name: 'Acciones',
      cell: (row: VendedorTypes) => <Acciones editarLink={`/registros/vendedores/${row.id_vendedor}`} eliminar={eliminar} id={row.id_vendedor} />
    }
  ];
  return (
    <Card>
      <header>Registros 🛒</header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="details personal">
          <span className="title">Vendedores</span>

          <div className="fields">
            <div className="input-fields">
              <label htmlFor="nombres">Nombres</label>
              <input type="text" id='nombres' placeholder='Ingrese sus nombres' {...register('nombres', {
                required: true,
              })} />
              {
                errors.nombres && <span className="input-error">Este campo es requerido</span>
              }
            </div>

            <div className="input-fields">
              <label htmlFor="apellidos">Apellidos</label>
              <input type="text" id='apellidos' placeholder='Ingrese sus apellidos' {...register('apellidos', {
                required: true,
              })} />
              {
                errors.apellidos && <span className="input-error">Este campo es requerido</span>
              }
            </div>

            <div className="input-fields">
              <label htmlFor="correo">Correo</label>
              <input type="email" id='correo' placeholder='Ejemplo: usuario@usuario.com' {...register('correo', {
                required: true,
              })} />
              {
                errors.correo && <span className="input-error">Este campo es requerido</span>
              }
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

              {
                errors.tipo_identificacion && <span className="input-error">Este campo es requerido</span>
              }
            </div>

            <div className="input-fields">
              <label htmlFor="numero_identificacion">Número de Identificación</label>
              <input type="number" id='numero_identificacion' placeholder='Ingrese el número de identificación' {...register('numero_identificacion', {
                required: true,
              })} />
              {
                errors.numero_identificacion && <span className="input-error">Este campo es requerido</span>
              }
            </div>

            <div className="input-fields">
              <label htmlFor="celular">Celular</label>
              <input type="text" id='celular' placeholder='Ingrese su número de celular' {...register('celular', {
                required: true,
              })} />
              {
                errors.celular && <span className="input-error">Este campo es requerido</span>
              }
            </div>

            <div className="input-fields">
              <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
              <input type="date" id='fecha_nacimiento' placeholder='Ingrese su fecha de nacimiento' {...register('fecha_nacimiento', {
                required: true,
              })} />
              {
                errors.fecha_nacimiento && <span className="input-error">Este campo es requerido</span>
              }
            </div>

            <div className="input-fields">
              <label htmlFor="direccion">Dirección</label>
              <input type="text" id='direccion' placeholder='Ingrese su dirección' {...register('direccion', {
                required: true,
              })} />
              {
                errors.direccion && <span className="input-error">Este campo es requerido</span>
              }
            </div>


          </div>
        </div>



        <button className="save-button">
          <span className="button-text">Guardar</span>
          <i className='bx bx-plus-circle'></i>
        </button>
      </form>

      <Table datos={vendedoresData} columnas={columnas} titulo='Lista de vendeores registrados' />
    </Card>
  )
}

export default Vendedores