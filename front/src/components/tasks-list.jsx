import React from 'react';

function TaskList({tasks}) {
  if (!tasks) {
    return <div></div>
  }
  return <div>{
    tasks.map((t,i) => (
        <div className="p-2 bg-indigo-100 items-center text-indigo-800 mb-2 leading-none rounded-full flex lg:inline-flex w-full" key={i}>
          <span className="flex rounded-full text-indigo-100 bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">{t.title}</span>
          <span className="font-semibold mr-2 text-left flex-auto">{t.description}</span>
      </div>)
    )
  }</div>
}

export default TaskList;