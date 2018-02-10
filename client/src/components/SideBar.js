import React, {Component} from 'react'
import axios from 'axios'
import ProfileModal from './ProfileModal'


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
        console.log(this)
    }
    componentDidUpdate(prevProps, prevState) {
        
       const {profiles,profile}=this.props
      if(!profile.id&&profiles.length > 0){
        
          this.select.value=profiles[0].id
          this.props.onSelect(profiles[0].id)
         
      } 
    }

    addProfile = async(e) => {
        e.preventDefault();
        let form = new FormData(e.target)
        for (var pair of form.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
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
                    <select ref={(i)=>{this.select=i}} onChange={e=>this.props.onSelect(e.target.value)} className="browser-default">
                        <option value=""  defaultValue>Choose your option</option>
                        {profiles && profiles.map(pr => <option key={pr.id} value={pr.id}>{pr.name}</option>)}
                    </select>
                </div>
                <div className="row">
                    <a className="waves-effect waves-light btn modal-trigger" data-target={`${this.state.modalId}`}>
                    <i className="material-icons left">add</i>Add Profile</a>
                </div>
                <div className="row">
                    
                </div>
            </div>
        )

    }

}
export default SideBar