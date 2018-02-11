import React from 'react'

const ProfileModal = ({onSubmit, modalId,errors}) => {
    return (

        <div id={modalId} className="modal">
            <div className="modal-content">
                <ul>
                    {errors && errors.map(e=>
                       <li className="red-text">{e}</li>
                    )} 
                </ul>
               
                
                <p></p>
                <form onSubmit={onSubmit} className="col s12">
                    <div className="row">
                        <div className="input-field col s10">
                            <input name='name' id="name" type="text" className="validate"/>
                            <label htmlFor="name">Entry Name</label>
                        </div>
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
                        <div className="input-field col s6">
                            <input name="password" id="password" type="password" className="validate"/>
                            <label htmlFor="password">Password</label>
                        </div>

                    </div>
                    <div className="row">
                       
                    </div>
                    <button
                        name="queue"
                        value="Queue item"
                        type="submit"
                        className="waves-effect  btn">Test Connection</button>
                    <span>&nbsp;</span>
                    <button type="submit" className="waves-effect  btn ">Save</button>
                </form>
            </div>
            <div className="modal-footer"></div>
        </div>
    );
}

export default ProfileModal;