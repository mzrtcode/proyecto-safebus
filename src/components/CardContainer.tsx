import styles from './cardContainer.module.css';

interface CardContainerProps {
  children: React.ReactNode;
}

const CardContainer = ({ children }: CardContainerProps) => {
  return (
    <div className={styles['card-container']}>
      {children}
    </div>
  );
}

export default CardContainer;