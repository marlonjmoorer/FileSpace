import React,{Component} from 'react';
import axios from 'axios';
import SideBar from './SideBar';


class  Dashboard extends Component {

    state={
        profile:{a:"b"},
        profiles:[1,2,3]
    }
    selectProfile=(e)=>{
        alert(e.target.value)
    }
    addProfile=async(e)=>{
        e.preventDefault();
        let form= new FormData(e.target)
        for (var pair of form.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        let response=await axios.post("/api/profile/addProfile",form)
        let {profile}=response.data
        this.setState({profiles:[...this.state.profiles,profile]})
        $('.modal').modal('close');
    }

   render(){
        return (
            <div className="row" style={{ marginBottom: 0}}>
                <div className="col s3 black" style={{height: '89vh'}}>
                    <SideBar {...this.state} addProfile={this.addProfile} onSelect={this.selectProfile}/>
                </div>
                <div className="col s9">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Cale</span>
                            <p>I am a very simple card. I am good at containing small bits of information. I
                                am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div className="card-action">
                            <a href="#">This is a link</a>
                            <a href="#">This is a link</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;