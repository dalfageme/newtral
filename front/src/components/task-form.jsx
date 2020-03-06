import React, { useState, useEffect } from 'react';
import moment from 'moment';
import tasksService from '../services/tasks';

function TaskForm({inputTask, onSave, selectedDate}) {

  const [task, setTask] = useState({
    title: 'tetetetteete',
    description: 'data',
    start: new Date()
  });
  
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const savedTask = await tasksService.saveTask(task);
    onSave(savedTask);
    setTask(savedTask);
  }

  const handleChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value
    });
  }

  useEffect(()=> {
    if(inputTask){
      console.log('dasdas');
      setTask({...inputTask});
    }
  },[])

  useEffect(()=> {
    setTask({...inputTask});
  }, [inputTask])

  return <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
        Title:
      </label>
      <input type="text" name="title" id="title" onChange={handleChange} value={task.title}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
        Description:
      </label>
      <textarea
        name="description" id="description" onChange={handleChange} value={task.description}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      ></textarea>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
        Fecha:
      </label>
      <input type="text" name="title" id="title" onChange={handleChange} value={moment(selectedDate || task.date).format()} disabled
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <input type="submit" value="Save"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      />
    </div>
  </form>
}

export default TaskForm;