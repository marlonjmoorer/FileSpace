import React from 'react';
import Login from './Login';
import Signup from './Signup';
import {Redirect} from 'react-router-dom'
import cookie from 'react-cookies'
const Home = (props) => {
    console.log(cookie.load("id"))
    if(cookie.load("id")){
        return <Redirect to="/dashboard"/>
    }
    return (
        
            <div className="row" style={{
                marginTop:'50px'
            }} >
                <div className="col s6">
                   <Login {...props}/>
                </div>
                <div className="col s6">
                    <Signup/>
                </div>
            </div>
    );
}

export default Home;