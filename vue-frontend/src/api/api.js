import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.vinylen.xyz/',
  withCredentials: true,
});
