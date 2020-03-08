import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import Login from './pages/login.jsx'
import Home from './pages/home';
import Users from './pages/users';
import User from './pages/user';

import Navbar from './components/navbar.jsx';
import Register from './pages/register';

function App() {
  return <Router>
  <>
    <Navbar/>
    <ToastContainer />
    <Switch>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/register">
        <Register/>
      </Route>
      <Route path="/users/:id">
        <User/>
      </Route>
      <Route path="/users">
        <Users/>
      </Route>
      <Route path="/">
        <Home/>
      </Route>
    </Switch>
    </>
  </Router>
}

export default App;
