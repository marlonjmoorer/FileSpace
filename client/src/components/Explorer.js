import React from 'react'
import { fail } from 'assert';
import File from './File';
import Folder from './Folder';
import FileDetailModal from './FileDetailModal';


const Explorer = ({profile, cwd, openFolder}) => {
    const modalId="detail"
    let segments= cwd? cwd.split("/"):[]
    
    const traverse=(folder,ascend)=>{
        let index=segments.indexOf(folder)+1
        let path
        if(index&&ascend){
            path=segments.slice(0,index).join("/")            
        }else{
            path=segments.concat(folder).join("/")
        }
        openFolder(path)
    }
    const mapPath=(seg,i) =>{
        if(!seg){
            return  <span className="breadcrumb">
                <i className="material-icons">home</i>
            </span>
        }                     
        return(
        <a key={i} href="#!" 
            onClick={()=>traverse(seg,true)} 
            className="breadcrumb">
                {seg}
        </a>)
    }
    return (
        <div>
            <FileDetailModal modalId={modalId} />
            <div className="card teal darken-1">
                <div className="card-content white-text">
                <button className="btn">Up</button>
                    <span className="card-title">
                        {segments&& segments.map(mapPath)}
                    </span>
                    <div className="explorer teal">
                        <div className="collection">
                            {profile.files && profile
                                .files
                                .sort(fileCompare)
                                .map(item => 
                                   item.isFile?
                                   <File onClick={()=>''} file={item}  />: 
                                   <Folder onClick={()=>{traverse(item.name)}} folder={item}/>
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