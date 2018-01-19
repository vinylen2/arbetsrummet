import api from '@/api/api';

export default {
  getAll() {
    return api.get('assignments').then(response => response.data);
  },
  post(data) {
    return api.post('assignments', data).then(response => response.data);
  },
  get(id) {
    return api.get(`assignments/${id}`).then(response => response.data);
  },
  search(queryObject) {
    return api.get('assignments/search', { params: queryObject }).then(response => response.data);
  },
};
