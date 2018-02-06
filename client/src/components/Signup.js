import React, {Component} from 'react'
import axios from 'axios'

export default class Signup extends Component {

    state={
        messages:[]
    }
    onSubmit=async(e)=>{
        e.preventDefault();
        var data= new FormData(e.target)
        try{
            var res= await axios.post("api/user/signup",data)
            console.log(res)
            this.setState({messages:[]})
        }catch(error){
          var {response}=error
            this.setState({messages:response.data.errors})
        }
        

    }

    render() {
        return (
            <div className="row card">
                <form onSubmit={this.onSubmit} className="col card-content s12" >
                <span className="card-title">Signup</span>
                    <ul>
                        {this.state.messages.map(e=>
                            <li className="red-text">{e}</li>
                        )}
                    </ul>
                    
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="text" className="validate" name="email"/>
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate" name="password"/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="confirm_password" type="password" className="validate" name="confirm_password"/>
                            <label htmlFor="confirm_password">Confirm  Password</label>
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
