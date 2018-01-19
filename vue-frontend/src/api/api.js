import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.vinylen.xyz/',
  // baseURL: 'http://localhost:3000/',
  withCredentials: true,
});
