import React, {Component} from 'react'
import axios from 'axios'
import ProfileModal from './ProfileModal'
import Folder from './Folder';

class SideBar extends Component {

    constructor(props){
        super(props)
    }

    state={
        modalId:"addModal",
        errors:[]
    }
    componentDidMount(){
        $(`#${this.state.modalId}`).modal({
            complete:()=>{
               this.setState({errors:[]})
            }
        });
    }

    addProfile = async(e) => {
        e.preventDefault();
        let form = new FormData(e.target)
        for (var pair of form.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        try {
            let response = await axios.post("/api/profile/addProfile", form)
            console.log(response.data)
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
               <ProfileModal onSubmit={this.addProfile} errors={this.state.errors} modalId={this.state.modalId}/>
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
                    <select onChange={this.props.onSelect} className="browser-default">
                        <option value=""  defaultValue>Choose your option</option>
                        {profiles && profiles.map(pr => <option key={pr.id} value={pr.id}>{pr.name}</option>)}
                    </select>
                </div>
                <div className="row">
                    <a className="waves-effect waves-light btn modal-trigger" data-target={`${this.state.modalId}`}>
                    <i className="material-icons left">add</i>Add Profile</a>
                </div>
                <div className="row">
                    <Folder profile={profile}/>
                </div>
            </div>
        )

    }

}
export default SideBar