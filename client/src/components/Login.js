import React, {Component} from 'react'

export default class Login extends Component {
    render() {
        return (
            <div className="row card">
                <form className="col card-content s12">
                <span className="card-title">Login</span>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="text" className="validate"/>
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate"/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        )
    }
}
