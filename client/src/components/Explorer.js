import React,{Component} from 'react'
import File from './File';
import Folder from './Folder';
import FileDetailModal from './FileDetailModal';
import axios from 'axios';
import UploadModal from './UploadModal';
import ItemMenu from './ItemMenu';
import Loading from './Loading';

class Explorer extends Component {
    constructor(props) {
        super(props);
        this.modalId='detail'
        this.uploadModalId="upload"
        
        this.state = {
            cwd:"",
            x:"",
            y:"",
            selectedItem:null,
            loading:true
        };
    }
    get segments(){
       return this.state.cwd? this.state.cwd.split("/"):[]
    }
    componentWillReceiveProps = (nextProps) => {
       
        if(nextProps.profile!=this.props.profile){
            this.setState({
                cwd:nextProps.profile.homeDir,
            },()=>{
                this.openFolder(this.state.cwd)
            })
        }
    }
    componentDidMount() {
        $(`#${this.modalId}`).modal();
        $(`#${this.uploadModalId}`).modal();

        document.onclick=()=>{
            this.setState({x:null,y:null})
        }
        
    }

    openFile=async(path)=>{
        if(path){
            let data={
                path:`${this.state.cwd}/${path}`,
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
            this.setState({loading:true})
            try {
                let res= await axios.get(`/api/profile/openFolder`,{params:data})
                if(res.data){
                    let{dirname,files}=res.data
                    this.setState({files,cwd:dirname})
                } 
            } catch (error) {
                console.log(error)
            }
            this.setState({loading:false})
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
        return(
        <a key={i} href={seg?"#!":null }
            onClick={this.traverse.bind(this,seg,true)} 
            className="breadcrumb">
            {seg?seg:<i className="material-icons">home</i>}
        </a>)
    }
   
    uploadFiles=async(files)=>{
        let params={
            path:this.state.cwd,
            id:this.props.profile.id
        }
        const formData = new FormData();
        files.forEach((file,i)=>{
            formData.append(`file ${i}`,file)
        })
        let response=await axios.post("/api/profile/upload",formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            },params
        })
        console.log(response)
        $(`#${this.uploadModalId}`).modal("close");
        this.openFolder(this.state.cwd)
    }
    menu=(e,item)=>{
        e.preventDefault();
        this.setState({x:e.pageX,y:e.pageY,selectedItem:item})
        console.log(e.pageX,e.pageY,item)
    }
    deleteItem= async(item)=>{
        console.log(item)
        let params={
            path:this.segments.concat(item.name).join("/"),
            id:this.props.profile.id,
            item
        }
        let response= await axios.get("/api/profile/delete",params)
    }

    render(){
        let {openFolder,profile}= this.props
        let {fileInfo,files,cwd,selectedItem,loading}=this.state
       

        return (
            <div>
                {selectedItem && 
                <ItemMenu 
                {...this.state} 
                deleteItem={this.deleteItem}
                showDetails={this.openFile}
                item={selectedItem}
                />}
               <UploadModal  modalId={this.uploadModalId} cwd={cwd} uploadFiles={this.uploadFiles}/>
               <FileDetailModal profileId={profile.id} modalId={this.modalId} fileInfo={fileInfo} />
                {!loading ? <div className="card purple darken-1 window">
                    <div className="card-content white-text">
                    
                    <button className="btn modal-trigger" data-target={`${this.uploadModalId}`} >
                       <i className="material-icons">cloud_upload</i>
                    </button>
                    <button className="btn" onClick={this.openFolder.bind(this,this.state.cwd)} >
                       <i className="material-icons">cached</i>
                    </button>
                        <span className="card-title">
                            {this.segments&& this.segments.map(this.mapPath)}
                        </span>
                        <div className="explorer">
                            <div className="collection">
                                {files && files
                                    .sort(fileCompare)
                                    .map((item,i) => 
                                       item.isFile?
                                       <File key={i} ctxMenu={this.menu} onClick={this.openFile.bind(this,item.name)} file={item}  />: 
                                       <Folder key={i} ctxMenu={this.menu}  onClick={this.traverse.bind(this,item.name)} folder={item}/>
                                    )}
                            </div>
                        </div>
    
                    </div>
                    
                </div>:<Loading/>}
    
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