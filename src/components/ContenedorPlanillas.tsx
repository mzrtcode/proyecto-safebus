import { PlanillajeTypes } from "../api/planillaje";
import { useAuth } from "../context/AuthContext";
import CardPlanilla from "./CardPlanilla";

const ContenedorPlanillas = ({ planillas }: { planillas: PlanillajeTypes[] }) => {

  const { planilla: planillaEstado, asignarPlanilla} = useAuth();
  
  return (
    <>
      {planillas.map((planilla) => (
        <CardPlanilla
        key={planilla.id_planilla}
        ruta={`${planilla.inicio_ruta} - ${planilla.fin_ruta}`}
        vehiculo={planilla.codigo_interno_vehiculo}
        seleccionado={planillaEstado !== null && planillaEstado.id_planilla === planilla.id_planilla}
        despachado={planilla.viaje_completado}
        onClick={()=>{
          asignarPlanilla(planilla);
        }}
      />
      ))}
    </>
  );
};

export default ContenedorPlanillas;
