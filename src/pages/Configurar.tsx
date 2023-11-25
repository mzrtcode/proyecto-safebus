import CardContainer from "../components/CardContainer"
import styles from './configurar.module.css'

function Configurar() {
  return (
    <CardContainer>
      <header className={styles.header}>Configurar 💻</header>
      
      <div>Configuraciones 🏨

        <p>Nombre empresa</p>
        <p>Direccion</p>
        <p>Telefono</p>
        <p>Etc</p>
      </div>
    </CardContainer>
  )
}

export default Configurar