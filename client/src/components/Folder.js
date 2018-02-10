import React from 'react'

const Folder = ({folder,onClick}) => (
    <a className="collection-item" onClick={onClick} >
        <span className="title">{folder.name}</span>
        <div className="secondary-content">
            <i className="material-icons">folder</i>
        </div>
    </a>
);

export default Folder;