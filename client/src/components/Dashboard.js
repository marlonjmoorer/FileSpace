import React,{Component} from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import Explorer from './Explorer';



class  Dashboard extends Component {

    state={
        profile:{},
        profiles:[],
        loading:false
    }
    selectProfile=async(id)=>{
        console.log(id)
        if(id){
           this.setState({loading:true})
            try {
                let res= await axios.get(`/api/profile/getProfile`,{params:{id}})
                if(res.data){
                    let{profile}=res.data
                    this.setState({profile})
                }
            } catch (error) {
                console.log(error)
            }
            this.setState({loading:false})
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
      // console.log(this.state)
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