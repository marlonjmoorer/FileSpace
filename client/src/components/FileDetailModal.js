import React from 'react'
const FileDetailModal = ({modalId,fileInfo}) => (
    <div id={modalId} class="modal open">
        <div class="modal-content">
        <h4>Modal Header</h4>
        <p>{fileInfo.name}</p>
        </div>
        <div class="modal-footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
    </div>
);

export default FileDetailModal;