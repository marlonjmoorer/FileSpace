import React from 'react'
import axios from 'axios'
import path from 'path'

const FileDetailModal = ({modalId,fileInfo,profileId}) =>{
    $(`#${modalId}`).modal()
    return(
    
    <div id={modalId} className="modal">
        {fileInfo&&  
            <div className="modal-content">
                <h4>{fileInfo.name}</h4>
                <hr/>
                <div className="row">
                    <div className="col s4">
                        Size:
                    </div>
                    <div className="col s8">
                        {fileInfo.size}bytes
                    </div>
                </div>
                <div className="row">
                    <div className="col s4">
                        Path:
                    </div>
                    <div className="col s8">
                        {fileInfo.path}
                    </div>
                </div>
                <div className="row">
                    <div className="col s4">
                        Last Modified:
                    </div>
                    <div className="col s8">
                        {new Date(fileInfo.last_modified).toLocaleString()}
                    </div>
                </div>

            </div>
        }
        <div className="modal-footer">
        {
            fileInfo&& fileInfo.isFile &&  
          <a href="#!"  onClick={download.bind(this,profileId,fileInfo.path)} className="modal-action waves-effect waves-green btn">Download</a>
        }
        </div>
    </div>
     )
}
const download=async(id,filePath)=>{
   
    
    try {
        const response= await axios.get("/api/profile/download",{params:{id,path:filePath},responseType:"blob"})
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        console.log(filePath.split('/').pop())
        link.href = url;
        link.setAttribute('download',filePath.split('/').pop());
        document.body.appendChild(link);
        link.click(); 
    } catch (error) {
        throw error
    }
}

export default FileDetailModal;