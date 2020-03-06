import axios from './axios';

export default {
  getUsers: async () => {
    return (await axios.get('/users')).data;
  },
  getUser: async (id) => {
    return (await axios.get('/users/' + id)).data;
  },
  
}