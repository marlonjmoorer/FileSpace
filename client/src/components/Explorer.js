import React from 'react'
import { fail } from 'assert';

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
    // a must be equal to b
    return 0;
}
const Explorer = ({profile, cwd, openFolder}) => {
    
    let segments= cwd? cwd.split("/"):[]
    const traverse=(folder,ascend)=>{
        let index=segments.indexOf(folder)+1
        let path
        if(index&&ascend){
            path=segments.slice(0,index).join("/")            
        }else{
            path=segments.concat(folder).join("/")
        }
        console.log(segments)
        console.log(path)
        console.log(index)
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
                                .map(file => <a
                                    href="#!"
                                    onClick={(e) => {
                                    if(!file.isFile){
                                        traverse(file.name)
                                    }else{

                                    }
                                    
                                }}
                                    key={file.name}
                                    className="collection-item">
                                    <span className="title">{file.name}</span>
                                    <div className="secondary-content">
                                        <i className="material-icons">{file.isFile
                                                ? ""
                                                : "folder"}</i>
                                    </div>
                                </a>)}
                        </div>
                    </div>

                </div>
                <div className="card-action">
                    
                </div>
            </div>

        </div>
    )
}

export default Explorer;