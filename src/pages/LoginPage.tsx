import  { useState } from 'react';
import styles from './loginPage.module.css';

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = ():void => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
   <div className={styles.main}>
     <div className={styles.container}>
      <div className={styles.forms}>
        <div className={styles.form}>
          <span className={styles.title}>Iniciar Sesion</span>

          <form action="#">
            <div className={styles['input-field']}>
              <input type="email" placeholder="Tu correo electronico" required />
              <i className={`uil uil-envelope ${styles.icon}`}></i>
            </div>
            <div className={styles['input-field']}>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                className={styles.clave}
                placeholder="Tu contraseña"
                required
              />
              <i className={`uil uil-lock ${styles.icon}`}></i>
              <i
                className={`uil ${isPasswordVisible ? 'uil-eye-slash' : 'uil-eye'} ${styles.showHidePw}`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>

            <div className={styles['checkbox-text']}>
              <div className={`${styles['checkbox-content']}`}>
                <input type="checkbox" id="logCheck" />
                <label htmlFor="logCheck">Recuerdame</label>
              </div>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            <div className={`${styles['input-field']} ${styles.button}`}>
              <input type="button" value="Iniciar Sesion" />
            </div>
          </form>
        </div>
      </div>
    </div>
   </div>
  );
};


export default LoginPage;
