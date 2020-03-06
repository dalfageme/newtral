import React, { useEffect, useState } from 'react';
import usersService from '../services/users';
import {useParams} from "react-router-dom";

function User() {
  const [user, setUser] = useState();
  let { id } = useParams();

  useEffect(()=> {
    const getData = async () => {
      const resp = await usersService.getUser(id);
      setUser(resp);
      console.log(resp);
    }
    getData();
  }, [])

  if(!user){
    return <div>
      Loading...
    </div>
  }
  return <div className="container mx-auto">
    <h1 class="text-4xl">Users</h1>
    <div class="flex items-center shadow-sm hover:shadow-lg mb-3 p-3  rounded-md cursor-pointer">
      <img src={'https://eu.ui-avatars.com/api/?name=' + user.username } class="w-10 h-10 rounded-full mr-4"/>
      <div class="text-sm">
        <p class="text-gray-900 leading-none">{user.username}</p>
        <p class="text-gray-600">{user.email}</p>
      </div>
    </div>
    <h2 class="text-2xl">Tasks</h2>
    {
      user.tasks.map(t => (
          <div class="p-2 bg-indigo-100 items-center text-indigo-800 mb-2 leading-none rounded-full flex lg:inline-flex" role="alert">
            <span class="flex rounded-full text-indigo-100 bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">{t.title}</span>
            <span class="font-semibold mr-2 text-left flex-auto">{t.description}</span>
        </div>)
      )
    }
  </div>
}

export default User;