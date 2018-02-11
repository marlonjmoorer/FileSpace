import React,{Component} from 'react'
import File from './File';
import Folder from './Folder';
import FileDetailModal from './FileDetailModal';
import axios from 'axios';

class Explorer extends Component {
    constructor(props) {
        super(props);
        this.modalId='detail'
        this.state = {
            segments:props.cwd? props.cwd.split("/"):[],
           
        };
    }
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.cwd!= this.props.cwd){
            this.setState({segments: nextProps.cwd.split("/")})
        }
        
    }
    
    componentDidMount() {
        $(`#${this.modalId}`).modal();
    }

    openFile=async(path)=>{
        if(path){
            let data={
                path,
                id:this.props.profile.id
            }
            try {
                let res= await axios.get(`/api/profile/fileDetail`,{params:data})
                if(res.data){
                  let fileInfo=res.data
                  this.setState({fileInfo},()=>{
                     $(`#${this.modalId}`).modal('open')
                  })
                  
                } 
            } catch (error) {
                console.log(error)
            }
        }
    }

    traverse=(folder,ascend)=>{
        
        let index=this.state.segments.indexOf(folder)+1
        let path
        if(index&&ascend){
            path=this.state.segments.slice(0,index).join("/")            
        }else{
            path=this.state.segments.concat(folder).join("/")
        }
        this.props.openFolder(path)
    }
    mapPath=(seg,i) =>{
        if(!seg){
            return  <span key={i} className="breadcrumb">
                <i className="material-icons">home</i>
            </span>
        }                     
        return(
        <a key={i} href="#!" 
            onClick={this.traverse.bind(this,seg,true)} 
            className="breadcrumb">
            {seg}
        </a>)
    }
    render(){
        let {openFolder,profile,cwd}= this.props
        let {segments,fileInfo}=this.state
        return (
            <div>
               <FileDetailModal profileId={profile.id} modalId={this.modalId} fileInfo={fileInfo} />
                <div className="card teal darken-1">
                    <div className="card-content white-text">
                    <button className="btn">Up</button>
                        <span className="card-title">
                            {segments&& segments.map(this.mapPath)}
                        </span>
                        <div className="explorer teal">
                            <div className="collection">
                                {profile.files && profile
                                    .files
                                    .sort(fileCompare)
                                    .map((item,i) => 
                                       item.isFile?
                                       <File key={i} onClick={this.openFile.bind(this,`${cwd}/${item.name}`)} file={item}  />: 
                                       <Folder key={i} onClick={this.traverse.bind(this,item.name)} folder={item}/>
                                    )}
                            </div>
                        </div>
    
                    </div>
                    <div className="card-action">
                        
                    </div>
                </div>
    
            </div>
        )
    }
}



let fileCompare = (a, b) => {
    if (a.isFile == b.isFile) {
        if (a.name < b.name) 
            return -1;
        if (a.name > b.name) 
            return 1;
        }
    else if (a.isFile && !b.isFile) {
        return 1;
    } else {
        return -1;
    }
}

export default Explorer;