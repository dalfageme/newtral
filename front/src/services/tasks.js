import axios from './axios';
import moment from 'moment';

export default {
  getTasks: async () => {
    try{
      const resp = await axios.get('/tasks/');
      return resp.data.map(task => ({
        title: task.title,
        description: task.description,
        date: task.start,
        _id: task._id
      }));
    }catch(err){
      return [];
    }
  },
  saveTask: async(task) => {
    try {
      const resp = await axios.post('/tasks/', {task});
      return resp.data;
    } catch {
      return [];
    }
  }
}