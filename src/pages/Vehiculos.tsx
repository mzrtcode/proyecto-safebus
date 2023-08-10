import Card from '../components/Card'
import { useForm } from "react-hook-form";
import Table from '../components/Table';
import { useLoaderData } from 'react-router-dom';
import { VehiculoTypes } from '../api/vehiculos';


const Vehiculos = () => {

  const { register, handleSubmit} = useForm();

    const onSubmit = (data:any) => {
        console.log(data)
    }

    const vehiculosData = useLoaderData() as VehiculoTypes[]
    
    const columnas = [
      {
        name: 'Propietario',
        selector: (row: VehiculoTypes) => row.id_propietario,
        sortable: true
      },
      {
        name: 'Placa',
        selector: (row: VehiculoTypes) => row.placa,
        sortable: true
      },
      {
        name: 'Marca',
        selector: (row: VehiculoTypes) => row.marca,
        sortable: true
      },
      {
        name: 'Modelo',
        selector: (row: VehiculoTypes) => row.modelo,
        sortable: true
      },
      {
        name: 'Color',
        selector: (row: VehiculoTypes) => row.color,
        sortable: true
      },
      {
        name: 'Año de Fabricación',
        selector: (row: VehiculoTypes) => row.anio_fabricacion,
        sortable: true
      },
      {
        name: 'Código Interno',
        selector: (row: VehiculoTypes) => row.codigo_interno,
        sortable: true
      },
      {
        name: 'Cantidad de Puestos',
        selector: (row: VehiculoTypes) => row.cantidad_puestos,
        sortable: true
      }
    ];
  return (
    <Card>
      <header>Registros 🚍</header>


      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="details personal">
          <span className="title">Vehiculos</span>

          <div className="fields">
            <div className="input-fields">
              <label htmlFor="localidad">Propietario</label>
              <input type="text" id='localidad' placeholder='Seleccione el propietario' {...register('localidad', {
                required: true,
                maxLength: 30
              })} />
              <span className="input-error">Este campo es requerido</span>
            </div>


            <div className="input-fields">
              <label htmlFor="acronimo">Placa</label>
              <input type="text" id='acronimo' placeholder='Ingrese la placa del vehículo' {...register('acronimo', {
                required: true,
                maxLength: 6
              })} />
              <span className="input-error">Este campo es requerido</span>
            </div>


            <div className="input-fields">
              <label htmlFor="acronimo">Marca</label>
              <input type="text" id='acronimo' placeholder='Ingrese la marca del vehículo' {...register('acronimo', {
                required: true,
              })} />
              <span className="input-error">Este campo es requerido</span>
            </div>

            <div className="input-fields">
              <label htmlFor="acronimo">Modelo</label>
              <input type="text" id='acronimo' placeholder='Ingrese el modelo del vehículo' {...register('acronimo', {
                required: true,
                maxLength: 3
              })} />
              <span className="input-error">Este campo es requerido</span>
            </div>

            <div className="input-fields">
              <label htmlFor="acronimo">Color</label>
              <input type="text" id='acronimo' placeholder='Ingrese el color del vehículo' {...register('acronimo', {
                required: true,
                maxLength: 3
              })} />
              <span className="input-error">Este campo es requerido</span>
            </div>

            <div className="input-fields">
              <label htmlFor="acronimo">Año de Fabricación</label>
              <input type="number" min="1900" max="2099" id='acronimo' placeholder='Ingrese el año de fabricación' {...register('acronimo', {
                required: true,
                maxLength: 3
              })} />
              <span className="input-error">Este campo es requerido</span>
            </div>

            <div className="input-fields">
              <label htmlFor="acronimo">Código Interno</label>
              <input type="text" id='acronimo' placeholder='Ingrese el código interno' {...register('acronimo', {
                required: true,
                maxLength: 3
              })} />
              <span className="input-error">Este campo es requerido</span>
            </div>

            <div className="input-fields">
              <label htmlFor="acronimo">Cantidad puestos</label>
              <input type="number" id='acronimo' placeholder='Ingrese el numero de puestos' {...register('acronimo', {
                required: true,
                maxLength: 3
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

      <Table columnas={columnas} datos={vehiculosData} titulo='Lista de vehiculos registrados' />
    </Card>
  )
}

export default Vehiculos