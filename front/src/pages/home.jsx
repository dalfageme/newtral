import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin  from '@fullcalendar/interaction';
import timeGridPlugin  from '@fullcalendar/timegrid';

import moment from 'moment';

import tasksService from '../services/tasks';
import usersService from '../services/users.js';
import TaskForm from '../components/task-form';
import TaskList from '../components/tasks-list';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState();
  const [selectedDate, setSelectedDate] = useState(moment().startOf('D'));
  const [users, setUsers] = useState([]);
  const [viewMode, setViewMode] = useState("list");

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
        plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
        events={tasks}
        fixedWeekCount={false}
        aspectRatio={1.5} 
        selectable={true}
        allDayDefault={true}
        firstDay={1}
        dateClick={(ev) => {
          setSelectedDate(moment(ev.date));
          if (viewMode !== 'create') {
            setViewMode('list');
          }
        }}
        eventClick={(ev) => {
          setViewMode('viewTask');
          setCurrentTask({
            title: ev.event.title,
            description: ev.event.extendedProps.description,
            _id: ev.event.extendedProps._id,
          })
        }}
      />
    </div>
    <div className="col-span-2 grid grid-rows-1 gap-4">
      <div className="row-span-1 bg-gray-300 p-4">
        { viewMode === 'create' && 
          <TaskForm inputTask={currentTask}
            onSave={(task) => {setTasks([...tasks, task])}} users={users}
            selectedDate={selectedDate}
            onCancel={() => setViewMode('list')}
            task={{
              title: '',
              start: moment(),
              description: ''
            }}
          />
        }
        { viewMode === 'viewTask' &&
          <TaskForm task={currentTask} users={users} 
            onSave={updatedTask => {
              const oldTasks = tasks.filter(t => t._id !== updatedTask._id );
              setTasks([...oldTasks, updatedTask])
            }}
            onCancel={() => setViewMode('list')}
          />
        }
        {
          viewMode === 'list' &&
          <div>
            <h2 className="text-center text-xl text-indigo-600 font-semibold">{selectedDate.format('LL')}</h2>
            <TaskList
              tasks={tasks.filter(t => selectedDate.isSame(t.date, 'd'))}
            />
          </div>
        }
        { viewMode === 'list' && 
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full" type="button"
            onClick={() => {
              setViewMode('create');
              setCurrentTask(undefined)
            }}
          >
            Create task
          </button>
        }
      </div>
    </div>
  </div>
}

export default Home;