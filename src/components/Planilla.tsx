type Datos = {
    ruta: string,
    vehiculo: string,
    estado: string
}

type PlanillaProps = {
    datos: Datos;
  };

const Planilla = ({ datos }: PlanillaProps) => {
    return (
        <div className="planilla"> {/* seleccionado */}
            <div className="planilla-info">
                <span className="ruta">{datos.ruta}</span>
                <span className="vehiculo">{datos.vehiculo}</span>
            </div>

            <div className="planilla_estado">
                <span className="estado despachado">{datos.estado}</span> {/* pendiente despachado */}
            </div>
        </div>
    )
}
export default Planilla