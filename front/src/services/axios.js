import axios from 'axios';

const http = axios.create({
  baseURL: "http://localhost:3000/api/",
  responseType: "json",
});

http.interceptors.request.use((config ) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization =  token;
  console.log('token', token);
  return config;
});

http.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if(error.response.status === 401){
    window.location.href = '  /login'
  }
})

export default http;