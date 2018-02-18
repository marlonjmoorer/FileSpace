import React from 'react'
const Breadcrumbs = ({onClick,links}) => (
    links.map((link,i)=>
     <a key={i} href={link?"#!":null }
        onClick={onClick.bind(this,link,true)} 
        className="breadcrumb">
        {link||<i className="material-icons">home</i>}
     </a>
    ));
export default Breadcrumbs;