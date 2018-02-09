import React, {Component} from 'react'
import axios from 'axios'
export default class Login extends Component {

    state={
        messages:[]
    }
    onSubmit=async(e)=>{
        e.preventDefault();
        var data= new FormData(e.target)
        try{
            var res= await axios.post("api/user/login",data)
            console.log(res)
            document.querySelectorAll("form").forEach(form=>
                form.reset()
            )
            this.setState({messages:[]})
            this.props.history.push("/");
        }catch(error){
            console.log(error)
            if(error.response){
                this.setState({messages:response.data.errors})
            }
            
        }
        

    }
    render() {
        console.log(this.props)
        return (
            <div className="row card">
                <form id="loginForm" onSubmit={this.onSubmit} className="col card-content s12">
                <span className="card-title">Login</span>
                    <ul>
                        {this.state.messages.map(e=>
                            <li className="red-text">{e}</li>
                        )}
                    </ul>
                    <div className="row">
                        <div className="input-field col s12">
                            <input name="email" type="text" className="validate"/>
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input name="password" type="password" className="validate"/>
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
