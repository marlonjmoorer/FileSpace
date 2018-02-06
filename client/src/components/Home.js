import React from 'react';
import Login from './Login';
import Signup from './Signup';

const Home = () => {
    return (
        <div
            className="main"
            style={{
            height: '100%',
            width: '100%',
            paddingTop:'50px'
        }}>
            <div className="row">
                <div className="col s6">
                   <Login/>
                </div>
                <div className="col s6">
                    <Signup/>
                </div>
            </div>
        </div>
    );
}

export default Home;