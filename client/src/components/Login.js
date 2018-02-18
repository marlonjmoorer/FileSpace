import React, {Component} from 'react'
import axios from 'axios'
import { Toast,AddFormValidation } from './Utils';


export default class Login extends Component {

    state={
      
    }
     componentDidMount() {
        AddFormValidation("loginForm", {
                email: {
                    required: true,
                    email:true
                },
                password: {
                    required: true,
                    minlength: 8
                },            
        });
        
     }

    onSubmit=async(e)=>{
        e.preventDefault();
        var data= new FormData(e.target)
        $(e.target).validate()
        if(!$(e.target).valid()){return}
        try{
            var res= await axios.post("api/user/login",data)
            document.querySelectorAll("form").forEach(form=>
                form.reset()
            )

            this.props.history.push("/");
        }catch(error){

            if(error.response&&error.response.data){
                error.response.data.forEach(error=>{
                   Toast(error)
                })
                this.setState({messages:error.response.data})
            }
            
        }
    }
    render() {

        return (
                <form id="loginForm" onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input name="email" type="text" className="validate"/>
                            <label htmlFor="email" data-error="Please enter a value." >Email</label>
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
        )
    }
}
