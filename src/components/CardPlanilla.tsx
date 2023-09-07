import styles from './cardPlanilla.module.css'; // Importa el módulo CSS
import Badge from './Badge';

interface CardPlanillaProps {
  ruta: string;
  vehiculo: string | number;
  seleccionado?: boolean;
  despachado?: boolean;
  onClick?: () => void;
}

const CardPlanilla = (props: CardPlanillaProps) => {
  const { ruta, vehiculo, seleccionado = false, despachado = true, onClick } = props;


  return (
    <div className={`${styles.planilla} ${seleccionado ? styles.seleccionado : ''}`} onClick={onClick}>
      <div className={styles['planilla-info']}>
        <span className={styles.ruta}>{ruta}</span>
        <span className={styles.vehiculo}>Vehiculo: {vehiculo}</span>
      </div>

      <div className={styles.planilla_estado}>
        {despachado ? (
          <Badge texto='Despachado' color='verde' />
        ) : (
          <Badge texto='Pendiente' color='morado' />
        )}
      </div>
    </div>
  );
};

export default CardPlanilla;

