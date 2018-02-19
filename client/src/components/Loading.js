import React from 'react'
const Loading = () => (

    <div className="explorer preloader-background black">
        <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-purple-only">
                <div className="circle-clipper left">
                    <div className="circle"></div>
                </div>
                <div className="gap-patch">
                    <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
            </div>
        </div>
        <p className="white-text">Loading...</p>
    </div>

);

export default Loading;