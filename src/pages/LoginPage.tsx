import  { useEffect, useState } from 'react';

import styles from './loginPage.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usuarioLogin } from '../api/auth.d';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const navigate = useNavigate();

  const { register, handleSubmit,/*  formState:{
    errors
  } */} = useForm<usuarioLogin>()

  const {iniciarSesion, isAuthenticated, errors} = useAuth()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = ():void => {
    setIsPasswordVisible((prevState) => !prevState);
  };


  const onSubmit: SubmitHandler<usuarioLogin> = (data) => {
    console.log(data);
    iniciarSesion(data)
  };

  useEffect(() =>{
    if(isAuthenticated) navigate('/dashboard');
  },[isAuthenticated])

  return (
   <div className={styles.main}>
     <div className={styles.container}>
      <div className={styles.forms}>
        <div className={styles.form}>
          <span className={styles.title}>Iniciar Sesion</span>

         {errors && <span className={styles['invalid-login']}>Credenciales inválidas</span>} 

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles['input-field']}>
              <input type="email" placeholder="Tu correo electronico" {...register('correo', {
                required: true,
              })}/>
              <i className={`uil uil-envelope ${styles.icon}`}></i>
            </div>
            <div className={styles['input-field']}>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                className={styles.clave}
                placeholder="Tu contraseña"
                {...register('clave', {
                  required: true,
                })}
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
              <input type="submit" value="Iniciar Sesion" />
            </div>
          </form>
        </div>
      </div>
    </div>
   </div>
  );
};


export default LoginPage;
