import axios, { AxiosInstance } from 'axios';

const instance:AxiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true, //Para que nos establesca la cookie automaticamente
});

export default instance;