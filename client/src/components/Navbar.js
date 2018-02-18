
import React from 'react';
import cookie from 'react-cookies';
import {withRouter} from "react-router-dom"
const Nav = (props) => {
    const loggedIn=cookie.load("id")
    const logout=()=>{
        cookie.remove("id")
        props.history.push("/");
    }
    
    return (

        <nav>
            <ul id="dropdown" className="dropdown-content">
                <li><a onClick={logout} >Logout</a></li>
            </ul>
            <div className="nav-wrapper purple darken-4">
                <a href="#" className="brand-logo">Logo</a>
                <ul id="nav-mobile" className="right hide-on-small-only">
                    { loggedIn &&  

                        <li>
                            <a className="dropdown-button" href="#!" data-activates="dropdown"><i className="material-icons right">arrow_drop_down</i></a>
                        </li>
                    }
                </ul>
            </div>
        </nav>   
    );
}

export default withRouter(Nav)