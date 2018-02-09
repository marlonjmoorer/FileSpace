import React from 'react'
import App from './App';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'
import './main.css'

const routes =  ()=>
<Router>
     <App>
          <Route exact path="/" component={Home}/>
          <Route exact path="/dashboard" component={Dashboard}/>   
    </App>
</Router>
   

export default routes