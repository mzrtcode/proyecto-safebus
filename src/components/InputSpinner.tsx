import  { useState } from 'react';
import styles from './InputSpinner.module.css';

const InputSpinner = () => {
  const [counter, setCounter] = useState(1);

  const handleMinusClick = () => {
    const newCounter = counter - 1 < 1 ? 1 : counter - 1;
    setCounter(newCounter);
  };

  const handlePlusClick = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
  };

  return (
    <div className={`${styles['num-block']} ${styles['skin-1']}`}>
      <div className={styles['num-in']}>
        <span
          className={`${styles.minus} ${counter < 2 ? styles.dis : ''}`}
          onClick={handleMinusClick}
        ></span>
        <input
          type="text"
          className={styles['in-num']}
          value={counter}
          readOnly
        />
        <span className={styles.plus} onClick={handlePlusClick}></span>
      </div>
    </div>
  );
};

export default InputSpinner;