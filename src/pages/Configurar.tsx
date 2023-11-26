import { Controller, useForm } from "react-hook-form";
import CardContainer from "../components/CardContainer"
import styles from './configurar.module.css'
import useToast from "../hooks/useToast";
import { EmpresaTypes, actualizarEmpresa, obtenerEmpresa } from "../api/empresa";
import { useEffect, useState } from "react";


function Configurar() {

  const { register, handleSubmit, setValue, reset, control, watch, formState: {
    errors,
  } } = useForm<EmpresaTypes>();


  const onSubmit = async (data: EmpresaTypes) => {
    try {
      console.log(data)

      const statusCode = await actualizarEmpresa(data);
      if (statusCode === 201) {
        obtenerDatosEmpresa();
        showToast(`Datos actualizados`, 'success', 'bottom-center');
      } else {
        showToast('Error al actualizar', 'error', 'bottom-center');
      }
      return;

    } catch (error) {
      showToast('Error al realizar la operación', 'error', 'bottom-center');
    }
  };
  const showToast = useToast();

  const obtenerDatosEmpresa = async () => {
    const datosEmpresa = await obtenerEmpresa();
    if(datosEmpresa == null) return;

    // Setear los valores del formulario
    setValue('nit', datosEmpresa.nit)
    setValue('razon_social', datosEmpresa.razon_social)
    setValue('direccion', datosEmpresa.direccion)
    setValue('telefono', datosEmpresa.telefono)
    setValue('ciudad', datosEmpresa.ciudad)
    setValue('mensaje', datosEmpresa.mensaje)
    setValue('porcentaje_costo_planilla', datosEmpresa.porcentaje_costo_planilla)
    setValue('fondo_reposicion', datosEmpresa.fondo_reposicion)
  }


  useEffect(() => {
    obtenerDatosEmpresa();
  }, [])
  

  const customStyles = {
    control: base => ({
      ...base,
      height: '42px',
      border: '1px solid #aaa',
      /*  zIndex: '9999' */
    })
  };

  return (
    <CardContainer>
      <header className={styles.header}>Configurar 💻</header>


      {/* Formulario Datos Empresa */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${styles.details} ${styles.personal}`}>
          <span className={styles.title}>Datos empresa</span>

          <div className={styles.fields}>

            {/*  Input Nit */}
            <div className={styles['input-fields']}>
              <label htmlFor="nit">Nit</label>
              <input
                type="text"
                id="nit"
                placeholder="Ejemplo: 111111111-1"
                {...register('nit', {
                  required: true,
                  maxLength: 30
                })}
              />

              {errors.nit && <span className={styles['input-error']}>Este campo es requerido</span>}

            </div>


            {/*  Input Razon social */}
            <div className={styles['input-fields']}>
              <label htmlFor="razon_social">Razon social</label>
              <input
                type="text"
                id="razon_social"
                placeholder="Ejemplo SafeBusApp S.A.S"
                {...register('razon_social', {
                  required: true,
                  maxLength: 30
                })}
              />

              {errors.razon_social && <span className={styles['input-error']}>Este campo es requerido</span>}

            </div>


            {/*  Input Direccion */}
            <div className={styles['input-fields']}>
              <label htmlFor="direccion">Direccion</label>
              <input
                type="text"
                id="direccion"
                placeholder="Ejemplo: Calle 1 # 2-3"
                {...register('direccion', {
                  required: true,
                  maxLength: 30
                })}
              />

              {errors.direccion && <span className={styles['input-error']}>Este campo es requerido</span>}

            </div>


            {/*  Input Telefono */}
            <div className={styles['input-fields']}>
              <label htmlFor="telefono">Telefono</label>
              <input
                type="text"
                id="telefono"
                placeholder="Ejemplo: 888450341"
                {...register('telefono', {
                  required: true,
                  maxLength: 30
                })}
              />

              {errors.telefono && <span className={styles['input-error']}>Este campo es requerido</span>}

            </div>


            {/*  Input Ciudad */}
            <div className={styles['input-fields']}>
              <label htmlFor="ciudad">Ciudad</label>
              <input
                type="text"
                id="ciudad"
                placeholder="Ejemplo: Ciudad Central"
                {...register('ciudad', {
                  required: true,
                  maxLength: 30
                })}
              />

              {errors.ciudad && <span className={styles['input-error']}>Este campo es requerido</span>}

            </div>


            {/*  Input Mensaje */}
            <div className={styles['input-fields']}>
              <label htmlFor="mensaje">Mensaje</label>
              <input
                type="text"
                id="mensaje"
                placeholder="Ejemplo: www.dominio.com"
                {...register('mensaje', {
                  required: true,
                  maxLength: 30
                })}
              />

              {errors.mensaje && <span className={styles['input-error']}>Este campo es requerido</span>}

            </div>

            {/*  Input Nit */}
            <div className={styles['input-fields']}>
              <label htmlFor="porcentaje_costo_planilla">Costo porcentaje planilla </label>
              <input
                type="number"
                id="porcentaje_costo_planilla"
                placeholder="Ejemplo: 15%"
                {...register('porcentaje_costo_planilla', {
                  required: true,
                  maxLength: 30,
                  valueAsNumber: true
                })}
              />

              {errors.porcentaje_costo_planilla && <span className={styles['input-error']}>Este campo es requerido</span>}

            </div>


            <div className={styles['input-fields']}>
              <label htmlFor="fondo_reposicion">Costo fondo reposicion</label>
              <input
                type="number"
                id="fondo_reposicion"
                placeholder="Ejemplo: 100"
                {...register('fondo_reposicion', {
                  required: true,
                  maxLength: 30,
                  valueAsNumber: true

                })
                
              }
                
              />

              {errors.fondo_reposicion && <span className={styles['input-error']}>Este campo es requerido</span>}

            </div>

          </div>
        </div>

        <div className={styles.buttons}>
          <button className={`${styles['save-button']} ${styles.button}`}>
            <span className={styles['button-text']}>Guardar</span>
            <i className={`bx bx-plus-circle ${styles.icon}`}></i>
          </button>
        </div>
      </form>

    </CardContainer>
  )
}

export default Configurar