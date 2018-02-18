import React,{Component} from 'react'

import FolderContents from './FolderContents';

import FileDetailModal from './FileDetailModal';
import axios from 'axios';
import UploadModal from './UploadModal';
import ItemMenu from './ItemMenu';
import Loading from './Loading';
import Breadcrumbs from './Breadcrumbs';
import { Toast } from './Utils';

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
            loading:true,
            files:[]
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
    
        let data={
            path:this.segments.concat(item.name).join("/"),
            id:this.props.profile.id,
            
        } 
        let response= await axios.get("/api/profile/delete",{params:data})
        if(response.data){
            console.log(response.data)
            Toast(response.data)
            this.setState({files:this.state.files.filter(f=>f.name!=item.name)})
        }
    }

    render(){
        let {openFolder,profile,profiles}= this.props
        let {fileInfo,files,cwd,selectedItem,loading}=this.state

        if(!profile.id){
            return <div className="window preloader-background white">
                    <h3 className="grey-text" >No Profile Selected</h3>
            </div>
        }
       

        return (
            <div>
                {selectedItem && 
                <ItemMenu 
                {...this.state} 
                deleteItem={this.deleteItem}
                showDetails={this.openFile}
                item={selectedItem}
                />}
               <UploadModal  modalId={this.uploadModalId} uploadFiles={this.uploadFiles}/>
               <FileDetailModal profileId={profile.id} modalId={this.modalId} fileInfo={fileInfo} />
                {
                    (loading&& <Loading/>) ||
                 <div className="card purple darken-2 window">
                    <div className="card-content white-text">
                    <span className="card-title">
                           <Breadcrumbs links={this.segments} onClick={this.traverse} />
                    </span>
                     <button className="btn modal-trigger"  data-target={this.uploadModalId} >
                       Upload<i className="material-icons right">cloud_upload</i>
                    </button>
                    &nbsp;
                    <button className="btn" onClick={this.openFolder.bind(this,this.state.cwd)} >
                      Refresh  <i className="material-icons right">refresh</i>
                    </button> 
                    &nbsp;
                    <button className="btn" onClick={this.openFolder.bind(this,this.state.cwd)} >
                      Create Folder  <i className="material-icons right">create_new_folder</i>
                    </button> 
                       
                       <FolderContents 
                            contents={files} 
                            openFile={this.openFile}
                            openFolder={this.traverse}
                            openContextMenu={this.menu} />
                    </div>
                    
                </div>}
    
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