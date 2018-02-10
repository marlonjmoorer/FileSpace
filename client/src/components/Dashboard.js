import React,{Component} from 'react';
import axios from 'axios';
import SideBar from './SideBar';


class  Dashboard extends Component {

    state={
        profile:{},
        profiles:[],
        currentDir:null
    }
    selectProfile=async(e)=>{
        const id=e.target.value
        if(id){
            try {
                let res= await axios.get(`/api/profile/getProfile/${id}`)
                if(res.data){
                    let{profile}=res.data
                    this.setState({profile,currentDir:profile.dirname})
                }
            } catch (error) {
                console.log(error)
            }
        }
    
    }
    loadProfiles=async()=>{
        try {
            let res= await axios.get("/api/profile/getProfiles")
            if(res.data){
                console.log(res.data)
                this.setState({profiles:res.data})
            }
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.loadProfiles()
    }

   render(){
        return (
            <div className="row" style={{ marginBottom: 0}}>
                <div className="col s3 black" style={{height: '89vh'}}>
                    <SideBar {...this.state}  loadProfiles={this.loadProfiles} onSelect={this.selectProfile}/>
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