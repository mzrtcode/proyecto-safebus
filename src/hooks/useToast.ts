import { toast, ToastOptions, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastType = 'success' | 'error' | 'warning' | 'info';

const useToast = () => {
  const showToast = (message: string, type: ToastType, position: ToastPosition) => {
    const options: ToastOptions = {
      position: position,
      autoClose: 3000, // Duración de la notificación en milisegundos
      hideProgressBar: true, // Oculta la barra de progreso
      theme: "dark",
    };

    toast[type](message, options);
  };

  return showToast;
};

export default useToast;
