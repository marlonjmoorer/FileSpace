import React,{Component} from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import Explorer from './Explorer';



class  Dashboard extends Component {

    state={
        profile:{},
        profiles:[],
        cwd:null
    }
    selectProfile=async(id)=>{
        if(id){
            try {
                let res= await axios.get(`/api/profile/getProfile/${id}`)
                if(res.data){
                    let{profile}=res.data
                    this.setState({profile,cwd:profile.dirname})
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    openFile=async(path)=>{
        if(path){
            let data={
                path,
                id:this.state.profile.id
            }
            try {
                let res= await axios.get(`/api/profile/fileDetail`,{params:data})
                if(res.data){
                  let fileInfo=res.data
                  this.setState({fileInfo})
                  
                } 
            } catch (error) {
                console.log(error)
            }
        }
    }
    openFolder=async(path)=>{

        if(path){
            let data={
                path,
                id:this.state.profile.id
            }
            try {
                let res= await axios.get(`/api/profile/openFolder`,{params:data})
                if(res.data){
                    let{dirname,files}=res.data
                    let profile= {...this.state.profile}
                    profile.files=files
                    this.setState({profile,cwd:dirname})
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
       console.log(this.state)
        return (
            <div className="row" style={{ marginBottom: 0}}>
                <div className="col s3 black" style={{height: '89vh'}}>
                    <SideBar {...this.state}  loadProfiles={this.loadProfiles} onSelect={this.selectProfile}/>
                </div>
                <div className="col s9">
                    <Explorer {...this.state} openFile={this.openFile} openFolder={this.openFolder} />
                </div>
            </div>
        );
    }
}

export default Dashboard;