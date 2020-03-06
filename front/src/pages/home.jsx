import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin  from '@fullcalendar/interaction';
import momentPlugin, {toMoment}  from '@fullcalendar/moment';
import timeGridPlugin from '@fullcalendar/timegrid';

import moment from 'moment';

import tasksService from '../services/tasks';
import usersService from '../services/users.js';
import TaskForm from '../components/task-form';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    (async () => {
      // @TODO use promise all
      const tasksResp = await tasksService.getTasks();
      setTasks(tasksResp);
      const usersResp = await usersService.getUsers();
      setUsers(usersResp);
    })()
  }, [])

  
  return <div className="grid grid-cols-5 gap-4">
    <div className="col-span-3 p-2">
      <FullCalendar 
        defaultView="dayGridMonth"
        plugins={[ dayGridPlugin, interactionPlugin, momentPlugin, timeGridPlugin ]}
        events={tasks}
        fixedWeekCount={false}
        aspectRatio={1.5}
        selectable={true}
        eventClick={(ev) => {
          setCurrentTask({
            title: ev.event.title,
            description: ev.event.extendedProps.description,
            _id: ev.event.extendedProps._id,
          })
        }}
        // select={(ev) => {
        //   setSelectedDate(ev.start);
        // }}
      />
    </div>
    <div className="col-span-2 grid grid-rows-1 gap-4">
      <div className="row-span-1 bg-gray-300 p-4">
        { currentTask && <button onClick={() => setCurrentTask(undefined)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
          Create task
        </button> }
        { !currentTask && <TaskForm inputTask={currentTask} onSave={(task) => {setTasks([...tasks, task])}} users={users}/>  }
        { currentTask && <TaskForm inputTask={currentTask} users={users} onSave={updatedTask => {
          const oldTasks = tasks.filter(t => t._id !== updatedTask._id );
          setTasks([...oldTasks, updatedTask])
        }}/>}
      </div>
    </div>
  </div>
}

export default Home;