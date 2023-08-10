import Card from '../components/Card'
import { useForm } from "react-hook-form";
import Table from '../components/Table';
import { useLoaderData } from 'react-router-dom';
import { AgenciaTypes } from '../api/agencias';


const Agencias = () => {

  const { register, handleSubmit, formState: {
    errors,
  }} = useForm();

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
                maxLength: 3
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