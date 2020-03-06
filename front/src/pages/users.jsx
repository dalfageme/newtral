import React, { useEffect, useState } from 'react';
import usersService from '../services/users';

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(()=> {
    const getData = async () => {
      const resp = await usersService.getUsers()
      setUsers(resp);
    }
    getData();
  }, [])
  return <div className="container mx-auto">
    <h1 class="text-4xl">Users</h1>
    {users.map(u => 
      <div class="flex items-center shadow-sm hover:shadow-lg mb-3 p-3  rounded-md cursor-pointer">
        <img src={'https://eu.ui-avatars.com/api/?name=' + u.username } class="w-10 h-10 rounded-full mr-4"/>
        <div class="text-sm">
          <p class="text-gray-900 leading-none">{u.username}</p>
          <p class="text-gray-600">{u.email}</p>
        </div>
      </div>
    )}
  </div>
}

export default Users;