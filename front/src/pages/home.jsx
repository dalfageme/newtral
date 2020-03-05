import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import tasksService from '../services/tasks';
import TaskForm from '../components/task-form';

function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    (async () => {
      const tasksResp = await tasksService.getTasks();
      setTasks(tasksResp);
      console.log(tasksResp);
    })()
  }, [])
  
  return <div className="grid grid-cols-5 gap-4">
    <div className="col-span-3">
      <FullCalendar 
        defaultView="dayGridMonth"
        plugins={[ dayGridPlugin ]}
        events={tasks}
        fixedWeekCount={false}
        aspectRatio={1.5}
      />
    </div>
    <div className="col-span-2 grid grid-rows-1 gap-4">
      <div className="row-span-1 bg-gray-300 p-4">
        <TaskForm/>
      </div>
    </div>
  </div>
}

export default Home;