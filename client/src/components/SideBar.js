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
        
    }
    componentDidMount(){
       
        $(`#${this.state.modalId}`).modal({
            complete:()=>{
               this.setState({errors:[]})
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        const {profile}=this.props
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
        const {profiles,profile,user,loading}=this.props
        return (
            <div>
               <ProfileModal 
               onSubmit={this.addProfile} 
               errors={this.state.errors} 
               modalId={this.state.modalId}

               testConnection={this.testConnection} />
               <div className="row">
                   
                </div>
                <div className="row">
                    <div className="col s12 center-align">
                        <i className="material-icons white" style={{fontSize:"100px",marginTop:"8px"}} >account_box</i>
                        <p className="white-text" >{user?user.username:""}</p>
                    </div>
                </div>
                <div className="row">
                    <label>Profile</label>
                    <select value={profile.id||""} onChange={e=>this.props.onSelect(e.target.value)} className="browser-default">
                        
                        {profiles&& profiles.length>0? profiles.map(pr => <option key={pr.id} value={pr.id}>{pr.name}</option>):<option value="" >No profiles added</option>}
                    </select>
                </div>
                <div className="row">
                    {loading &&
                        <div className="progress">
                            <div className="indeterminate"></div>
                        </div>}
                    <a className={(loading?"disabled ":"")+"col m6 s12 waves-effect waves-light btn modal-trigger"} data-target={`${this.state.modalId}`}>
                        <i className="material-icons right">add</i>Add Profile
                    </a>
                    
                    <a  className={(loading || profiles.length==0 ?"disabled ":"")+"col m6 s12 waves-effect waves-light red btn "}>
                        <i className="material-icons right">delete</i> Remove Profile
                    </a>
                   
                </div>
                
            </div>
        )

    }

}
export default SideBar