import styles from './card.module.css'

interface CardProps {
    children: React.ReactNode;
  }

const Card = ({ children }: CardProps) => {
  return (
    <div className={styles.Card}>
        {children}
    </div>
  )
}

export default Card