import React,{Component} from 'react';
import Navbar from './components/Navbar';
import './main.css'
class App extends Component {
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

export default App;