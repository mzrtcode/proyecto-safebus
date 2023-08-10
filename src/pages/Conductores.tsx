import Card from '../components/Card'
import './conductores.css'


import { useForm } from "react-hook-form";
import Table from '../components/Table';
import { ConductorTypes } from '../api/conductores';
import { useLoaderData } from 'react-router-dom';
import { formatearFecha } from '../api/general';

const Conductores = () => {

  const { register, handleSubmit} = useForm();
  const onSubmit = (data:any) => {
    console.log(data)
  }

  const conductoresData = useLoaderData() as ConductorTypes[];
  

  
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
      selector: (row: PropietarioTypes) => row.acciones
    }
  ];
  return (
    <Card>
      <header>Registros 🚗</header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="details personal">
          <span className="title">Conductores</span>

          <div className="fields">
            <div className="input-fields">
              <label htmlFor="localidad">Nombres</label>
              <input type="text" id='localidad' placeholder='Ingrese sus nombres' {...register('localidad', {
                required: true,
              })} />
              <span className="input-error">Este campo es requerido</span>
            </div>

            <div className="input-fields">
              <label htmlFor="acronimo">Apellidos</label>
              <input type="text" id='acronimo' placeholder='Ingrese sus apellidos' {...register('acronimo', {
                required: true,
              })} />
              <span className="input-error">Este campo es requerido</span>
            </div>

            <div className="input-fields">
              <label htmlFor="acronimo">Correo</label>
              <input type="email" id='acronimo' placeholder='Ejemplo: usuario@usuario.com' {...register('acronimo', {
                required: true,
              })} />
              <span className="input-error">Este campo es requerido</span>
            </div>

            <div className="input-fields">
              <label htmlFor="tipo_identificacion">Tipo de identificacion:</label>

              <select  id="tipo_identificacion" {...register('acronimo', {
                required: true,
              })} >
                <option value="">Seleccionar</option>
                <option value="C.C.">C.C.</option>
                <option value="T.I.">T.I.</option>
                <option value="C.E.">C.E.</option>
                <option value="Pasp.">Pasp.</option>
              </select>
           
              <span className="input-error">Este campo es requerido</span>
            </div>

            <div className="input-fields">
              <label htmlFor="acronimo">Número de Identificación</label>
              <input type="number" id='acronimo' placeholder='Ingrese el número de identificación' {...register('acronimo', {
                required: true,
              })} />
              <span className="input-error">Este campo es requerido</span>
            </div>

            <div className="input-fields">
              <label htmlFor="acronimo">Celular</label>
              <input type="text" id='acronimo' placeholder='Ingrese su número de celular' {...register('acronimo', {
                required: true,
              })} />
              <span className="input-error">Este campo es requerido</span>
            </div>

            <div className="input-fields">
              <label htmlFor="acronimo">Fecha de Nacimiento</label>
              <input type="date" id='acronimo' placeholder='Ingrese su fecha de nacimiento' {...register('acronimo', {
                required: true,
              })} />
              <span className="input-error">Este campo es requerido</span>
            </div>

            <div className="input-fields">
              <label htmlFor="acronimo">Dirección</label>
              <input type="text" id='acronimo' placeholder='Ingrese su dirección' {...register('acronimo', {
                required: true,
              })} />
              <span className="input-error">Este campo es requerido</span>
            </div>


          </div>
        </div>



        <button className="save-button">
          <span className="button-text">Guardar</span>
          <i className='bx bx-plus-circle'></i>
        </button>
      </form>

      <Table datos={conductoresData} columnas={columnas} titulo='Lista de concutores registrados' />
    </Card>
  )
}

export default Conductores