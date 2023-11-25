import CardContainer from "../components/CardContainer"
import styles from './reportes.module.css'


function Reportes() {
  return (
    <CardContainer>
      <header className={styles.header}>Reportes 📄</header>

      <div>Generar tira de planillaje 📃</div>
    </CardContainer>
  )
}

export default Reportes