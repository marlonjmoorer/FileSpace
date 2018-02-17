import React, {Component} from 'react'
import axios from 'axios'
import { Toast } from './Utils';
export default class Signup extends Component {

    state={
      
    }
    componentDidMount() {
        $("#signupForm").validate({
            rules: {
                email: {
                    required: true,
                    email:true
                },
                password: {
                    required: true,
                    minlength: 5
                },
                confirm_password: {
                    required: true,
                    equalTo: "#password"
                },               
            },
            errorClass: "invalid",
            errorElement : 'span',
            errorPlacement: function(error, element) {
              var placement = $(element).data('error');
             
              if (placement) {
                $(placement).append(error)
              } else {
                error.insertAfter(element);
              }
            }
         });
    }

    onSubmit=async(e)=>{
        e.preventDefault();
        var data= new FormData(e.target)
        $(e.target).validate()
        if(!$(e.target).valid()){return}
        try{
            var res= await axios.post("api/user/signup",data)
            console.log(res)
            document.querySelectorAll("form").forEach(form=>
                form.reset()
            )
            Toast(res.data)
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
           
                <form id="signupForm" onSubmit={this.onSubmit} >
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

        )
    }
}
