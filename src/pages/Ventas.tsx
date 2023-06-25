import Card from '../components/Card'
import './ventas.css'
import InputSpinner from '../components/InputSpinner'
import DateTimeComponent from '../components/DateTimeComponent'
import Table from '../components/Table'
import { useForm, SubmitHandler, set } from "react-hook-form";
import { useEffect, useState } from 'react';

type Inputs = {
    agencia: string,
    ruta: string,
    vehiculo: string,
    conductor: string,
    total   : number,
    puestos: string,
    valorTiquete: number
  } 

const datos = [
    {
      numeroTiquete: 1,
      ruta: 'Ciudad Central - Ciudad del Este',
      pasajeros: 10,
      total: 100,
      hora: '10:00 AM'
    },
    {
      numeroTiquete: 2,
      ruta: 'Pueblo Nuevo - Ciudad del Oeste',
      pasajeros: 5,
      total: 50,
      hora: '11:30 AM'
    },
    {
      numeroTiquete: 3,
      ruta: 'Villa del Sol - Ciudad del Norte',
      pasajeros: 7,
      total: 70,
      hora: '12:15 PM'
    },
  ];

  interface Localidades {
    numeroTiquete: number;
    ruta:string,
    pasajeros: number;
    total: number,
    hora: string;
  }

  const columnas = [
    {
      name: 'Numero tiquete',
      selector: (row: Localidades) => row.numeroTiquete,
      sortable: true
    },
    {
      name: 'Ruta',
      selector: (row: Localidades) => row.ruta,
      sortable: true
    },
    {
      name: 'Pasajeros',
      selector: (row: Localidades) => row.pasajeros,
      sortable: true
    },
    {
      name: 'Total',
      selector: (row: Localidades) => row.total,
      sortable: true
    },
    {
      name: 'Hora',
      selector: (row: Localidades) => row.hora,
      sortable: true
    }
  ];

const Ventas = () => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm<Inputs>();

      const [detallesVenta, setDetallesVenta] = useState({
        valorTiquete: 3500,
        totalPuestosVehiculo: 30,
        puestosOcupados: 10,
        precioTotal: 0,
      })

      const actualizarPrecioTotal = (cantidad:number) => {
        const precioTotal = cantidad * detallesVenta.valorTiquete;
        setDetallesVenta((detallesVenta) => ({ ...detallesVenta, precioTotal }));
        setValue('total', precioTotal);
      };


      

      useEffect(() => {
        setValue('agencia', 'Terminal Popayan');     
        setValue('ruta', 'Popayan - Cali');
        setValue('vehiculo', '3060');
        setValue('conductor', 'Daniel Perez Gomez');
        setValue('total', detallesVenta.precioTotal);
        setValue('puestos', (detallesVenta.totalPuestosVehiculo - detallesVenta.puestosOcupados + "/" + detallesVenta.totalPuestosVehiculo));
        setValue('valorTiquete', detallesVenta.valorTiquete);
        
      }, [])
      
      

    return (
        <>
            <Card>
                <header>Ventas</header>
                <div className="contenedor">
                    <div className="derecha">

                        <div className="main">

                            <div className="main-left">
                                <div className="input-fields">
                                    <label htmlFor="agencia">Agencia</label>
                                    <input
                                        type="text"
                                        id="agencia"
                                        placeholder="Nombre de la agencia"
                                        disabled
                                        {...register("agencia")}
                                    />

                                </div>

                                <div className="input-fields">
                                    <label htmlFor="ruta">Ruta</label>
                                    <input
                                        type="text"
                                        id="ruta"
                                        placeholder="Nombre de la ruta"
                                        disabled
                                        {...register("ruta")}

                                    />

                                </div>

                                <div className="input-fields">
                                    <label htmlFor="vehiculo">Vehiculo</label>
                                    <input
                                        type="text"
                                        id="vehiculo"
                                        placeholder="Codigo del vehiculo"
                                        disabled
                                        {...register("vehiculo")}

                                    />

                                </div>

                                <div className="input-fields">
                                    <label htmlFor="conductor">Conductor</label>
                                    <input
                                        type="text"
                                        id="conductor"
                                        placeholder="Nombre del conductor"
                                        disabled
                                        {...register("conductor")}

                                    />

                                </div>


                                <div className="input-fields">
                                    <label htmlFor="total">TOTAL</label>
                                    <input
                                        type="number"
                                        id="total"
                                        placeholder="Valor total"
                                        disabled
                                        {...register("total")}

                                    />

                                </div>
                            </div>


                            <div className="main-right">
                                <div className="input-fields">
                                    <label htmlFor="inicioRuta">Fecha</label>
                                    <DateTimeComponent type="date"/>

                                </div>

                                <div className="input-fields">
                                    <label htmlFor="inicioRuta">Hora</label>
                                    <DateTimeComponent type="time"/>

                                </div>

                                <div className="input-fields">
                                    <label htmlFor="puestos">P Ocupados / Disponibles</label>
                                    <input
                                        type="text"
                                        id="inicioRuta"
                                        placeholder="Puestos Ocupados"
                                        disabled
                                        {...register("puestos")}

                                    />

                                </div>

                                <div className="input-fields">
                                    <label htmlFor="valorTiquete">Valor tiquete</label>
                                    <input
                                        type="number"
                                        id="valorTiquete"
                                        placeholder="Valor tiquete"
                                        {...register("valorTiquete")}
                                    />

                                </div>

                                <label htmlFor="">Cantidad puestos</label>

                                <InputSpinner onChange={actualizarPrecioTotal}/>
                               
                             
                                
                                <button>Crear tiquete</button>
                                <button>Despachar</button>
                                <button>Anular Planilla</button>

                            </div>
                        </div>
                                <Table columnas={columnas} datos={datos} titulo='Tiquetes Vendidos'/>

                    </div>
                    <div className="izquierda">
                        <div className="planilla seleccionado">
                            <div className="planilla-info">
                                <span className="ruta">TEST - TEST</span>
                                <span className="vehiculo">Vehiculo: 3060</span>
                            </div>

                            <div className="planilla_estado">
                                <span className="estado pendiente">Pendiente</span>
                            </div>
                        </div>

                        <div className="planilla">
                            <div className="planilla-info">
                                <span className="ruta">TIMBIO - POPAYAN</span>
                                <span className="vehiculo">Vehiculo: 3060</span>
                            </div>

                            <div className="planilla_estado">
                                <span className="estado despachado">Despachado</span>
                            </div>
                        </div>

                        <div className="planilla">
                            <div className="planilla-info">
                                <span className="ruta">EL BORDO - ROSAS</span>
                                <span className="vehiculo">Vehiculo: 3060</span>
                            </div>

                            <div className="planilla_estado">
                                <span className="estado despachado">Despachado</span>
                            </div>
                        </div>

                        <div className="planilla">
                            <div className="planilla-info">
                                <span className="ruta">CALI - EL TAMBO</span>
                                <span className="vehiculo">Vehiculo: 3060</span>
                            </div>

                            <div className="planilla_estado">
                                <span className="estado despachado">Despachado</span>
                            </div>
                        </div>

                        <div className="planilla">
                            <div className="planilla-info">
                                <span className="ruta">CALI - EL TAMBO</span>
                                <span className="vehiculo">Vehiculo: 3060</span>
                            </div>

                            <div className="planilla_estado">
                                <span className="estado despachado">Despachado</span>
                            </div>
                        </div>

                        <div className="planilla">
                            <div className="planilla-info">
                                <span className="ruta">CALI - EL TAMBO</span>
                                <span className="vehiculo">Vehiculo: 3060</span>
                            </div>

                            <div className="planilla_estado">
                                <span className="estado despachado">Despachado</span>
                            </div>
                        </div>

                        <div className="planilla">
                            <div className="planilla-info">
                                <span className="ruta">CALI - EL TAMBO</span>
                                <span className="vehiculo">Vehiculo: 3060</span>
                            </div>

                            <div className="planilla_estado">
                                <span className="estado despachado">Despachado</span>
                            </div>
                        </div>

                        <div className="planilla">
                            <div className="planilla-info">
                                <span className="ruta">CALI - EL TAMBO</span>
                                <span className="vehiculo">Vehiculo: 3060</span>
                            </div>

                            <div className="planilla_estado">
                                <span className="estado despachado">Despachado</span>
                            </div>
                        </div>

                        <div className="planilla">
                            <div className="planilla-info">
                                <span className="ruta">CALI - EL TAMBO</span>
                                <span className="vehiculo">Vehiculo: 3060</span>
                            </div>

                            <div className="planilla_estado">
                                <span className="estado despachado">Despachado</span>
                            </div>
                        </div>

                        <div className="planilla">
                            <div className="planilla-info">
                                <span className="ruta">CALI - EL TAMBO</span>
                                <span className="vehiculo">Vehiculo: 3060</span>
                            </div>

                            <div className="planilla_estado">
                                <span className="estado despachado">Despachado</span>
                            </div>
                        </div>

                        <div className="planilla">
                            <div className="planilla-info">
                                <span className="ruta">CALI - EL TAMBO</span>
                                <span className="vehiculo">Vehiculo: 3060</span>
                            </div>

                            <div className="planilla_estado">
                                <span className="estado despachado">Despachado</span>
                            </div>
                        </div>

                        <div className="planilla">
                            <div className="planilla-info">
                                <span className="ruta">CALI - EL TAMBO</span>
                                <span className="vehiculo">Vehiculo: 3060</span>
                            </div>

                            <div className="planilla_estado">
                                <span className="estado despachado">Despachado</span>
                            </div>
                       
                        </div>


                    </div>



                   
                </div>
            </Card>
        </>
    )
}

export default Ventas