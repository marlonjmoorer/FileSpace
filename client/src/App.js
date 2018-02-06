import React,{Component} from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';

import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'
import './main.css'
class App extends Component {
   render() {
      return (
        <Router>
            <div className="outter">
               <Navbar/>
               <Route exact path="/" component={Home}/>   
            </div>
        </Router>
      );
   }
}
export default App;