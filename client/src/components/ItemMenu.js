import React from 'react'
const ItemMenu = ({item,x,y,deleteItem,showDetails}) => (
    <ul  className="collection"   style={{
        top:`${y}px`,left:`${x}px`,
        position: "absolute",
        display:(x&&y)?"block":"none",
        zIndex: 10
    }} >
        <li onClick={showDetails.bind(this,item.name)} className="collection-item">Properties</li>
        <li onClick={deleteItem.bind(this,item)} className="collection-item">Delete</li> 
   </ul>
);

export default ItemMenu;