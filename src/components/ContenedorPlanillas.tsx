import { PlanillajeTypes } from "../api/planillaje";
import { useAuth } from "../context/AuthContext";
import CardPlanilla from "./CardPlanilla";

const ContenedorPlanillas = ({ planillas }: { planillas: PlanillajeTypes[] }) => {
  const { planilla: planillaEstado, asignarPlanilla } = useAuth();

  // Ordenar el arreglo planillas por viaje_completado
  planillas.sort((a, b) => {
    if (a.viaje_completado === b.viaje_completado) {
      // Si viaje_completado es igual, ordenar por id_planilla en orden descendente
      return b.id_planilla - a.id_planilla;
    }
    // Ordenar por viaje_completado en orden descendente
    return b.viaje_completado - a.viaje_completado;
  }).reverse();

  return (
    <>
      {planillas.map((planilla) => (
        <CardPlanilla
          key={planilla.id_planilla}
          ruta={`${planilla.inicio_ruta} - ${planilla.fin_ruta}`}
          vehiculo={planilla.codigo_interno_vehiculo}
          seleccionado={
            planillaEstado !== null &&
            planillaEstado.id_planilla === planilla.id_planilla
          }
          despachado={planilla.viaje_completado}
          onClick={() => {
            asignarPlanilla(planilla);
          }}
        />
      ))}
    </>
  );
};

export default ContenedorPlanillas;
