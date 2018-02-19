import React, {Component} from 'react';
import Login from './Login';
import Signup from './Signup';
import {Redirect} from 'react-router-dom'
import cookie from 'react-cookies'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        $('.tabs').tabs()
    }
    render() {
        if (cookie.load("id")) {
            return <Redirect to="/dashboard"/>
        }
        return (
            <div className="container">
                <div
                    className="row"
                    style={{
                    marginTop: '50px'
                }}>
                    <div className="col s8 push-s2">

                        <div className="card">
                            <ul className="tabs  tabs-fixed-width">
                                <li className="tab col s4">
                                    <a href="#login">Login</a>
                                </li>
                                <li className="tab col s4">
                                    <a href="#signup">Signup</a>
                                </li>
                            </ul>

                            <div id="login" className="card-content">
                                <Login {...this.props}/>
                            </div>
                            <div id="signup" className="card-content">
                                <Signup/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}

export default Home;