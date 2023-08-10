import Card from '../components/Card'
import { useForm } from "react-hook-form";
import Table from '../components/Table';
import { VendedorTypes } from '../api/vendedores';
import { useLoaderData } from 'react-router-dom';
import { formatearFecha } from '../api/general';


const Vendedores = () => {

  const { register, handleSubmit, formState:{
    errors
  }} = useForm();
  const onSubmit = (data: any) => {
    console.log(data)
  }

  const vendedoresData = useLoaderData() as VendedorTypes[]

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
      selector: ( row: VendedorTypes) => row.celular,
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