import Card from '../components/Card'
import { useForm } from "react-hook-form";
import Table from '../components/Table';
import { useLoaderData } from 'react-router-dom';
import { AgenciaTypes } from '../api/agencias';


const Agencias = () => {

  const { register, handleSubmit} = useForm();

    const onSubmit = (data:any) => {
        console.log(data)
    }

    const agenciasData = useLoaderData() as AgenciaTypes[]
    
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
      }
    ];
  return (
    <Card>
      <header>Registros 🏦</header>


      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="details personal">
          <span className="title">Agencias</span>

          <div className="fields">
            <div className="input-fields">
              <label htmlFor="localidad">Nombre localidad</label>
              <input type="text" id='localidad' placeholder='Ingrese el nombre de la agencia' {...register('localidad', {
                required: true,
                maxLength: 30
              })} />
              <span className="input-error">Este campo es requerido</span>
            </div>

            <div className="input-fields">
              <label htmlFor="acronimo">Dirección</label>
              <input type="text" id='acronimo' placeholder='Ingrese la dirección de la agencia' {...register('acronimo', {
                required: true,
                maxLength: 3
              })} />
              <span className="input-error">Este campo es requerido</span>
            </div>

            <div className="input-fields">
              <label htmlFor="acronimo">Codigo interno</label>
              <input type="text" id='acronimo' placeholder='Ejemplo: C2' {...register('acronimo', {
                required: true,
                maxLength: 2
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


      <Table datos={agenciasData} columnas={columnas} titulo='Lista de agencias registradas'/>
    </Card>
  )
}

export default Agencias