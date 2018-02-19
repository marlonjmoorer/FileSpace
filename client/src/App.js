import React,{Component} from 'react';
import Navbar from './components/Navbar';
import {withRouter} from "react-router-dom"
import './main.css'
class App extends Component {


    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            $('.dropdown-button').dropdown();
        });
    }
   render() {
      return (
            <div className="outter">
                
                <div
                    className="main">
                    <Navbar/>
                    {this.props.children}
               </div>
            </div>
      );
   }
}

export default withRouter(App);