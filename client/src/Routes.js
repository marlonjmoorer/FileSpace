import React from 'react'
import App from './App';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'


 

export default ()=>
<Router>
     <App>
          <Route exact path="/" component={Home}/>
          <Route exact path="/dashboard" component={Dashboard}/>   
     </App>
</Router>