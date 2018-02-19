import React from 'react'
const NewFolderModal = ({modalId,createFolder}) => 
{
    let name="New Folder"
    const onChange=({target})=> name=target.value
    return(
        <div id={modalId} className="modal">
        <div className="modal-content">
            <h4>New Folder</h4>
            <div className="input-field col s6">
                <input placeholder="New Folder" onChange={onChange}  type="text" className="validate"/>
            </div>
        </div>
        <div className="modal-footer">
            <a className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
            <a onClick={e=>createFolder(name)} className="modal-action modal-close waves-effect waves-green btn-flat">Save</a>
        </div>
    </div>
    );
}

export default NewFolderModal;