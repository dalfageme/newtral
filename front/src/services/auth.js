import axios from './axios';

export default {
  login: async (email, password) => {
    try{
      const resp = await axios.post('/users/login', { email, password });
      const token = resp.data.token;
      localStorage.setItem('token', token);
      return {
        logged: true
      };
    }catch(err){
      return {
        logged: false,
        error: err.request.response ? err.request.response.error : 'No se pudo conectar'
      };
    }
  },
  register: async (user) => {
    try{
      return axios.post('/users/register', user);
    }catch(err){
      return undefined;;
    }
  }
}