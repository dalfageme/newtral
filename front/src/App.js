import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

import Login from './pages/login.jsx'
import Home from './pages/home';
import Users from './pages/users';
import User from './pages/user';

function App() {
  return <Router>
   <Switch>
      <Route path="/login">
        <Login/>
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
  </Router>
}

export default App;
