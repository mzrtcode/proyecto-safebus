import Card from '../components/Card'
import { useForm } from "react-hook-form";
import Table from '../components/Table';


const Vendedores = () => {

  const { register, handleSubmit, formState:{
    errors
  }} = useForm();
  const onSubmit = (data: any) => {
    console.log(data)
  }

  const datos = [
    {
      id: 1,
      nombres: 'John',
      apellidos: 'Doe',
      correo: 'johndoe@example.com',
      tipo_identificacion: 'C.C.',
      numero_identificacion: '123456789',
      celular: '1234567890',
      fecha_nacimiento: '1990-01-01',
      direccion: 'Calle Principal 123'
    },
    {
      id: 2,
      nombres: 'Jane',
      apellidos: 'Smith',
      correo: 'janesmith@example.com',
      tipo_identificacion: 'T.I.',
      numero_identificacion: '987654321',
      celular: '0987654321',
      fecha_nacimiento: '1995-05-10',
      direccion: 'Avenida Secundaria 456'
    }
  ];

  const columnas = [
    {
      name: 'Nombres',
      selector: 'nombres',
      sortable: true
    },
    {
      name: 'Apellidos',
      selector: 'apellidos',
      sortable: true
    },
    {
      name: 'Correo',
      selector: 'correo',
      sortable: true
    },
    {
      name: 'Tipo de Identificación',
      selector: 'tipo_identificacion',
      sortable: true
    },
    {
      name: 'Número de Identificación',
      selector: 'numero_identificacion',
      sortable: true
    },
    {
      name: 'Celular',
      selector: 'celular',
      sortable: true
    },
    {
      name: 'Fecha de Nacimiento',
      selector: 'fecha_nacimiento',
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

      <Table datos={datos} columnas={columnas} titulo='Lista de vendeores registrados' />
    </Card>
  )
}

export default Vendedores