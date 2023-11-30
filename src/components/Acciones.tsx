import { Link, useNavigate } from 'react-router-dom'
import styles from './acciones.module.css'

interface AccionesProps {
  editarLink: string | null;
  eliminar: (id: number) => void;
  id: number;
}

const Acciones: React.FC<AccionesProps> = ({ editarLink, eliminar, id }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.acciones}>
      {editarLink !== null && (
        <span className={styles.editar}>
          <i className='bx bxs-pencil' onClick={() => navigate(editarLink)} />
        </span>
      )}
      <span className={styles.eliminar} onClick={() => eliminar(id)}>
        <i className='bx bx-minus-circle' />
      </span>
    </div>
  )
}

export default Acciones;


