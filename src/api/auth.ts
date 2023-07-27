import axios from './axios';
import {usuarioLogin, usuarioRegistro} from './auth.d';


export const loginRequest = (usuario: usuarioLogin) => axios.post('/login', usuario);

export const registerRequest = (usuario: usuarioRegistro) => axios.post(`/registro`, usuario);

export const verifyTokenRequest = () => axios.get('/verificar');