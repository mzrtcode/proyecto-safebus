import { useForm } from "react-hook-form";
import Table from '../components/Table';
import Card from "../components/Card";

const Propietarios = () => {


  const { register, handleSubmit } = useForm();
  const onSubmit = (data:any) => {
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
      <header>Registros 🙎🏻‍♂️</header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="details personal">
          <span className="title">Propietarios</span>

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

      <Table datos={datos} columnas={columnas} titulo="Lista de propietarios registrados" />
    </Card> 
  )
}

export default Propietarios