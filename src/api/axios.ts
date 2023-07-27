import axios, { AxiosInstance } from 'axios';

const instance:AxiosInstance = axios.create({
  baseURL: 'https://localhost:3000/api',
  withCredentials: true, //Para que nos establesca la cookie automaticamente
});

export default instance;