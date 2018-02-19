import React from 'react'
const FolderItem = ({onClick,item,onContextMenu}) => (
    <a className="collection-item" onClick={onClick.bind(this,item.name)} onContextMenu={e=>onContextMenu(e,item)} >
        <span className="title">{item.name}</span>
        <div className="secondary-content">
            <i className="material-icons">{item.isFile?"insert_drive_file":"folder"}</i>
        </div>
    </a>
);

export default FolderItem;