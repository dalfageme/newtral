
import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import auth from '../services/auth.js';

export default function() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [logged, setLogged] = useState(false);
  const handleSubmit = async () => {
    const result = await auth.login(email, password);
    setLogged(result.logged);
    setError(result.error);
  };

  if(logged) {
    return <Redirect to=""/>  
  }

  return <div className="justify-center flex p-5 min-h-screen items-center flex-row">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-auto">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Email
      </label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username" type="email" placeholder="email" required
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input value={password} onChange={(e) => setPassword(e.target.value)} 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
        id="password" type="password" placeholder="******************"
      />
      { error && 
        <div class="p-2 bg-red-800 items-center text-red-100 leading-none rounded-full flex lg:inline-flex" role="alert">
          <span class="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">error</span>
          <span class="font-semibold mr-2 text-left flex-auto">{ error }</span>
        </div>
      }
    </div>
    <div className="flex items-center justify-between">
      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
        Sign In
      </button>
    </div>
  </form>
</div>
}