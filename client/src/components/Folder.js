import React from 'react'

let fileCompare=(a, b) =>{
    if (a.isFile) {
      return 1;
    }else{   
      return -1;
    }
    // a must be equal to b
    return 0;
  }
const Folder = ({profile}) => (
    <ul className="collapsible purple" data-collapsible="accordion">
    <li>
      <div className="collapsible-header"><i className="material-icons">folder</i>{profile.name}</div>
      <div className="collapsible-body">
        <div className="collection">
            {profile.files && profile.files.filter(f=>!f.isFile).map(file=>
                <a href="#!" className="collection-item">
                    <span className="title">{file.name}</span>
                    <div className="secondary-content"><i className="material-icons">folder</i></div>
                </a>
            )}
        </div>
      </div>
    </li>
  </ul>
);

export default Folder;