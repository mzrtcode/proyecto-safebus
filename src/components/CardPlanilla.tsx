import styles from './cardPlanilla.module.css'; // Importa el módulo CSS
import Badge from './Badge';

const CardPlanilla = () => {
  return (
    <div className={styles.planilla + ' ' + styles.seleccionado}>
      <div className={styles['planilla-info']}>
        <span className={styles.ruta}>TESTING - TESTING</span>
        <span className={styles.vehiculo}>Vehiculo: XXXX</span>
      </div>

      <div className={styles.planilla_estado}>
        <Badge texto='Nuevo' color='morado' />
      </div>
    </div>
  );
};

export default CardPlanilla;
