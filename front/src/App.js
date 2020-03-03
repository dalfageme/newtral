import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

import Login from './pages/login.jsx'

function App() {
  return <Router>
   <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/">
      </Route>
    </Switch>
  </Router>
}

export default App;
