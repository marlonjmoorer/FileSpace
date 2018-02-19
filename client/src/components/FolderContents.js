import React from 'react'
import FolderItem from './FolderItem';

const FolderContents = ({contents,openContextMenu,openFile,openFolder}) => (
    <div className="explorer white">
        <div className="collection">
            { contents
                .sort(fileSort)
                .map((item,i) => 
                  <FolderItem 
                    key={i}
                    item={item}
                    onContextMenu={openContextMenu} 
                    onClick={item.isFile?openFile:openFolder} />
            )}
        </div>
    </div>
);

let fileSort= (a, b) => {
    
    if (a.isFile == b.isFile) {
        if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()){ 
            return -1;
        }
        else{ 
            return 1;
        }
    }
    else if (a.isFile && !b.isFile) {
        return 1;
    } else {
        return -1;
    }
}
export default FolderContents;