import React from 'react'
const ItemMenu = ({item,x,y,deleteItem,showDetails}) => (
    <div className="collection"   style={{
        top:`${y}px`,left:`${x}px`,
        position: "absolute",
        display:(x&&y)?"block":"none",
        zIndex: 10
    }} >
        <a onClick={showDetails.bind(this,item.name)} className="collection-item">Properties</a>
        <a onClick={deleteItem.bind(this,item)} className="collection-item">Delete</a> 
   </div>
);

export default ItemMenu;