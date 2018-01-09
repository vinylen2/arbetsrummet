import api from '@/api/api';

export default {
  getAll() {
    return api.get('assignments').then(response => response.data);
  },
  post(data) {
    return api.post('assignments', data).then(response => response.data);
  },
};
