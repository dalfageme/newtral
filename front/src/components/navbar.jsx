import React from 'react';
import {Link, NavLink} from 'react-router-dom';

function Navbar() {
  return <nav className="flex items-center justify-between flex-wrap bg-indigo-500 p-3">
    <div className="flex items-center flex-shrink-0 text-white mr-6">
      <span className="font-semibold text-xl tracking-tight">Newtral</span>
    </div>
    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div className="text-sm lg:flex-grow">
        <NavLink to="/" activeClassName="text-indigo-100 font-medium" className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4">
          Calendar
        </NavLink>
        <NavLink to="/users" activeClassName="text-indigo-100 font-medium" className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4">
          Users
        </NavLink>
      </div>
      <div>
        <Link to="/login"  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-indigo-500 hover:bg-white mt-4 lg:mt-0">Logout</Link>
      </div>
    </div>
  </nav>
}

export default Navbar;