import axios from './axios';

export default {
  getUsers: async () => {
    return (await axios.get('/users')).data;
  }
}