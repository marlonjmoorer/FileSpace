import React,{Component} from 'react'
import File from './File';
import Folder from './Folder';
import FileDetailModal from './FileDetailModal';
import axios from 'axios';

class Explorer extends Component {
    constructor(props) {
        super(props);
        this.modalId='detail'
        let {profile}=props
        
        this.state = {
            cwd:"",
           // segments:[]
        };
    }
    get segments(){
       return this.state.cwd? this.state.cwd.split("/"):[]
    }
    componentWillReceiveProps = (nextProps) => {

        if(nextProps.profile!=this.props.profile){

            this.setState({
                cwd:nextProps.profile.homeDir,
                files:nextProps.profile.files
            })
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
    openFolder=async(path)=>{

        if(path){
            let data={
                path,
                id:this.props.profile.id
            }
            try {
                let res= await axios.get(`/api/profile/openFolder`,{params:data})
                if(res.data){
                    let{dirname,files}=res.data
                    this.setState({files,cwd:dirname})
                } 
            } catch (error) {
                console.log(error)
            }
        }
    }
    traverse=(folder,ascend)=>{
        
        let index=this.segments.indexOf(folder)+1
        let path
        if(index&&ascend){
            path=this.segments.slice(0,index).join("/")            
        }else{
            path=this.segments.concat(folder).join("/")
        }
        this.openFolder(path)
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
        let {openFolder,profile}= this.props
        let {fileInfo,files,cwd}=this.state
        return (
            <div>
               <FileDetailModal profileId={profile.id} modalId={this.modalId} fileInfo={fileInfo} />
                <div className="card purple darken-1">
                    <div className="card-content white-text">
                    <button className="btn">   <i className="material-icons left">cloud_upload</i>Upload</button>
                        <span className="card-title">
                            {this.segments&& this.segments.map(this.mapPath)}
                        </span>
                        <div className="explorer teal">
                            <div className="collection">
                                {files && files
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