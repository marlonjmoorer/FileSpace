import React,{Component} from 'react'
import { AddFormValidation } from './Utils';


class ProfileModal extends Component{

    constructor(props){
        super(props)
        this.state={
            form:new FormData()
        }

    }
    componentDidMount() {
        
        this.state.form.set('name','')
        this.state.form.set('host','')
        this.state.form.set('port','')
        this.state.form.set('username','')
        this.state.form.set('password','')
        AddFormValidation("profileForm",
        {
            name:{required: true},
            host:{required: true},
            port:{
                number:true,
                minlength:2,
                maxlength:4
            },
            username:{required:true},
            password:{required:true}
                     
        })
        

    }
    handleChange=(e)=>{
        var form=this.state.form
        form.set(e.target.name,e.target.value)
        this.setState({form})
    }
    onClick=(e)=>{
        e.preventDefault()
        $("#profileForm").validate()
        if(!$("#profileForm").valid()){return}
        //this.props.testConnection(this.state.form)
    }

    render(){
        let {onSubmit, modalId,errors,message,testConnection}=this.props
        return (
 
         <div id={modalId} className="modal">
             <div className="modal-content">
                 <ul>
                     {errors && errors.map(e=>
                        <li className="red-text">{e}</li>
                     )} 
                 </ul>
                
                 
                 <p></p>
                 <form id="profileForm" onSubmit={this.onSubmit} className="col s12 ">
                     <div className="row">
                         <div className="input-field col s10">
                             <input onChange={this.handleChange} name='name' id="name" type="text" className="validate"/>
                             <label  htmlFor="name">Entry Name</label>
                         </div>
                         <div className="input-field col s10">
                             <input onChange={this.handleChange} name='host' id="host" type="text" className="validate"/>
                             <label htmlFor="host">Host</label>
                         </div>
                         <div className="input-field col s2">
                             <input onChange={this.handleChange} name='port' id="port" type="text" className="validate"/>
                             <label htmlFor="port">Port</label>
                         </div>
                     </div>
                     <div className="row">
                         <div className="input-field col s6">
                             <input onChange={this.handleChange} name="username" id="username" type="text" className="validate"/>
                             <label htmlFor="username">Username</label>
                         </div> 
                         <div className="input-field col s6">
                             <input  onChange={this.handleChange} name="password" id="password" type="password" className="validate"/>
                             <label htmlFor="password">Password</label>
                         </div>
 
                     </div>
                     <div className="row">
                        <span>
                            {message}
                        </span>
                     </div>
                     <button 
                          onClick={this.onClick}
                         className="waves-effect  btn">Test Connection</button>
                     <span>&nbsp;</span>
                     <button 
                          type="submit"
                           className="waves-effect  btn ">Save</button>
                 </form>
             </div>
             <div className="modal-footer"></div>
         </div>
     ); 
    }

}

/* const ProfileModal = ({onSubmit, modalId,errors,message,testConnection}) => {
 
       return (

        <div id={modalId} className="modal">
            <div className="modal-content">
                <ul>
                    {errors && errors.map(e=>
                       <li className="red-text">{e}</li>
                    )} 
                </ul>
               
                
                <p></p>
                <form onSubmit={onSubmit} className="col s12 profile">
                    <div className="row">
                        <div className="input-field col s10">
                            <input name='name' id="name" type="text" className="validate"/>
                            <label htmlFor="name">Entry Name</label>
                        </div>
                        <div className="input-field col s10">
                            <input name='host' id="host" type="text" className="validate"/>
                            <label htmlFor="host">Host</label>
                        </div>
                        <div className="input-field col s2">
                            <input name='port' id="port" type="text" className="validate"/>
                            <label htmlFor="port">Port</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input name="username" id="username" type="text" className="validate"/>
                            <label htmlFor="username">Username</label>
                        </div> 
                        <div className="input-field col s6">
                            <input name="password" id="password" type="password" className="validate"/>
                            <label htmlFor="password">Password</label>
                        </div>

                    </div>
                    <div className="row">
                       <span>
                           {message}
                       </span>
                    </div>
                    <button 
                         onClick={e=>{
                             e.preventDefault()
                             testConnection(document.querySelector('.profile'))
                            }}
                        className="waves-effect  btn">Test Connection</button>
                    <span>&nbsp;</span>
                    <button 
                         type="submit"
                          className="waves-effect  btn ">Save</button>
                </form>
            </div>
            <div className="modal-footer"></div>
        </div>
    ); 
   
   
} */

export default ProfileModal;