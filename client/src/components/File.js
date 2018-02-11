import React from 'react'
const File = ({file,onClick}) => {
    return( 
    <a className="collection-item" onClick={onClick}>
        <span className="title">{file.name}</span>
        <div className="secondary-content">
            <i className="material-icons">insert_drive_file</i>
        </div>
    </a>);
}

export default File;