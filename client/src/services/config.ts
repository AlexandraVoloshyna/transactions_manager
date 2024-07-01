import axios from 'axios';
const server = 'http://localhost:3000/api/';
console.log(server);
const axiosInstance = axios.create({
  baseURL: server,
  withCredentials: true,
});

export default axiosInstance;
