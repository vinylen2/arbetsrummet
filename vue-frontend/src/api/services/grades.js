import api from '@/api/api';

export default {
  getAll() {
    return api.get('grades').then(response => response.data);
  },
};
