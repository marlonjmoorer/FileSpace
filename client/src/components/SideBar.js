import React, {Component} from 'react'
import axios from 'axios'
import ProfileModal from './ProfileModal'
import {Toast} from './Utils'
import Loading from './Loading'


class SideBar extends Component {

    constructor(props){
        super(props)
    }

    state={
        modalId:"addModal",
        errors:[],
        profileId:'',
        testMessage:''
    }
    componentDidMount(){
       
        $(`#${this.state.modalId}`).modal({
            complete:()=>{
               this.setState({errors:[],testMessage:''})
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        const {profile}=this.props
        console.log(this.props)
        console.log(nextProps)
        if(!profile.id && nextProps.profiles.length > 0 && this.props.profiles.length==0){
            
           this.props.onSelect(nextProps.profiles[0].id)
        } 
    }

    
    componentDidUpdate(prevProps, prevState) {
        
      
    }
    testConnection= async(data) => {
        console.log(data)
        try {
            let response = await axios.post("/api/profile/testConnection", data)

            if (response.data) {
              Toast(response.data)
            }
        } catch (error) {

            console.log(error)
            if(error.response){
                console.log(error.response.data)
                Toast(error.response.data)
            }
        }

    }
    addProfile = async(e) => {
        
        e.preventDefault();

        let form = new FormData(e.target)
        this.setState({testMessage:''})
        try {
            let response = await axios.post("/api/profile/addProfile", form)

            if (response.data.success) {
                this.props.loadProfiles()
                this.setState({errors:[]})
                $(`#${this.state.modalId}`).modal('close');
            }
        } catch (error) {

            console.log(error)
            if(error.response){
                console.log(error.response.data)
                this.setState({errors:error.response.data.messages})
            }
        }
       
        


    }
    render() {
        const {profiles,profile}=this.props
        return (
            <div>
               <ProfileModal 
               onSubmit={this.addProfile} 
               errors={this.state.errors} 
               modalId={this.state.modalId}
               message={this.state.testMessage}
               testConnection={this.testConnection} />
                <div className="row">
                    <div className="col s12 center-align">
                        <img
                            width="150"
                            height="150"
                            src="https://dl2.macupdate.com/images/icons256/58907.png?d=1513523636"
                            alt=""
                            className="circle responsive-img"/>
                    </div>
                </div>
                <div className="row">
                    <label>Profile</label>
                    <select value={profile.id||""} onChange={e=>this.props.onSelect(e.target.value)} className="browser-default">
                        <option value="" >Choose your option</option>
                        {profiles && profiles.map(pr => <option key={pr.id} value={pr.id}>{pr.name}</option>)}
                    </select>
                </div>
                <div className="row">
                    <a className="waves-effect waves-light btn modal-trigger" data-target={`${this.state.modalId}`}>
                    <i className="material-icons left">add</i>Add Profile</a>
                   {this.props.loading &&
                   <div className="progress">
                        <div className="indeterminate"></div>
                    </div>}
                </div>
                
            </div>
        )

    }

}
export default SideBar