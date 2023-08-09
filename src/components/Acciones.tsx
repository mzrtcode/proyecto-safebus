import { Link } from 'react-router-dom'
import styles from './acciones.module.css'

interface AccionesProps {
  editarLink: string;
  eliminar: (id: number) => void;
  id: number;
}


const Acciones: React.FC<AccionesProps> = ({ editarLink, eliminar, id }) => {


  return (
    <div className={styles.acciones}>
      <span className={styles.editar}>
        <Link to={editarLink}> <i className='bx bxs-pencil' /> </Link>
      </span>
      <span className={styles.eliminar} onClick={()=>{eliminar(id)}}>
        <i className='bx bx-minus-circle' />
      </span>

    </div>
  )
}
export default Acciones

