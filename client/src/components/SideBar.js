import React, {Component} from 'react'

const SideBar= ({onSelect, profiles,addProfile})=>{
        
       return (
            <div>
                <div id="addModal" className="modal">
                    <div className="modal-content">
                        <h4>Modal Header</h4>
                        <p></p>
                        <form onSubmit={addProfile} className="col s12">
                            <div className="row">
                                <div className="input-field col s10">
                                    <input name='host' id="host" type="text" className="validate"/>
                                    <label htmlFor="host">Host</label>
                                </div>
                                <div className="input-field col s2">
                                    <input name='port' id="port" type="text" className="validate"/>
                                    <label htmlFor="port">Port</label>
                                </div>
                            </div>
                             <div className="row">
                                <div className="input-field col s6">
                                    <input name="username" id="username" type="text" className="validate"/>
                                    <label htmlFor="username">Username</label>
                                </div>
                               
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input name="password" id="password" type="password" className="validate"/>
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                            <button   name="queue" value="Queue item" type="submit"  className="waves-effect  btn">Test Connection</button> <span>&nbsp;</span>
                            <button type="submit" className="waves-effect  btn ">Save</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                       
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 center-align">
                        <img
                            width="150"
                            height="150"
                            src="https://dl2.macupdate.com/images/icons256/58907.png?d=1513523636"
                            alt=""
                            className="circle responsive-img"/>
                    </div>
                </div>
                <div className="row">
                    <label>Profile</label>
                    <select onChange={onSelect} className="browser-default">
                        <option value="" disabled defaultValue >Choose your option</option>
                       {profiles&& profiles.map(pr=>
                        <option key={pr} value="">{pr}</option>
                        )}
                    </select>
                </div>
                <div className="row">
                   <a className="waves-effect waves-light btn modal-trigger" href="#addModal"><i className="material-icons left">add</i>Add Profile</a>
                </div>
                <div className="row">

                    <div className="card ">
                        <div className="card-content white-text">
                            <span className="card-title">Card e</span>
                            <p>I am a very simple card. I am good at containing small bits of information. I
                                am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div className="card-action">
                            <a href="#">This is a link</a>
                            <a href="#">This is a link</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
 export default SideBar