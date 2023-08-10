import Card from '../components/Card'
import { useForm } from "react-hook-form";
import Table from '../components/Table';
import { useLoaderData } from 'react-router-dom';
import { VehiculoTypes } from '../api/vehiculos';


const Vehiculos = () => {

  const { register, handleSubmit, formState: {
    errors
  }} = useForm();

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
              <label htmlFor="id_propietario">Propietario</label>
              <input type="text" id='id_propietario' placeholder='Seleccione el propietario' {...register('id_propietario', {
                required: true,
                maxLength: 30
              })} />
             {
                errors.id_propietario && <span className="input-error">Este campo es requerido</span>
              }
            </div>


            <div className="input-fields">
              <label htmlFor="placa">Placa</label>
              <input type="text" id='placa' placeholder='Ingrese la placa del vehículo' {...register('placa', {
                required: true,
                maxLength: 6
              })} />
              {
                errors.placa && <span className="input-error">Este campo es requerido</span>
              }
            </div>


            <div className="input-fields">
              <label htmlFor="marca">Marca</label>
              <input type="text" id='marca' placeholder='Ingrese la marca del vehículo' {...register('marca', {
                required: true,
              })} />
              {
                errors.marca && <span className="input-error">Este campo es requerido</span>
              }
            </div>

            <div className="input-fields">
              <label htmlFor="modelo">Modelo</label>
              <input type="text" id='modelo' placeholder='Ingrese el modelo del vehículo' {...register('modelo', {
                required: true,
                maxLength: 3
              })} />
              {
                errors.modelo && <span className="input-error">Este campo es requerido</span>
              }
            </div>

            <div className="input-fields">
              <label htmlFor="color">Color</label>
              <input type="text" id='color' placeholder='Ingrese el color del vehículo' {...register('color', {
                required: true,
                maxLength: 3
              })} />
              {
                errors.color && <span className="input-error">Este campo es requerido</span>
              }
            </div>

            <div className="input-fields">
              <label htmlFor="anio_fabricacion">Año de Fabricación</label>
              <input type="number" min="1900" max="2099" id='anio_fabricacion' placeholder='Ingrese el año de fabricación' {...register('anio_fabricacion', {
                required: true,
                maxLength: 3
              })} />
              {
                errors.anio_fabricacion && <span className="input-error">Este campo es requerido</span>
              }
            </div>

            <div className="input-fields">
              <label htmlFor="codigo_interno">Código Interno</label>
              <input type="text" id='acronimo' placeholder='Ingrese el código interno' {...register('codigo_interno', {
                required: true,
                maxLength: 3
              })} />
              {
                errors.codigo_interno && <span className="input-error">Este campo es requerido</span>
              }
            </div>

            <div className="input-fields">
              <label htmlFor="cantidad_puestos">Cantidad puestos</label>
              <input type="number" id='cantidad_puestos' placeholder='Ingrese el numero de puestos' {...register('cantidad_puestos', {
                required: true,
                maxLength: 3
              })} />
              {
                errors.cantidad_puestos && <span className="input-error">Este campo es requerido</span>
              }
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