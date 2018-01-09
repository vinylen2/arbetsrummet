import api from '@/api/api';

export default {
  getAll() {
    return api.get('subjects').then(response => response.data);
  },
};
