import React from 'react';

function MovieContainer(props) {
    return (
        <div className="container-fluid" style={{background: "#4a4949"}}>
            <div className="row">
                {props.children}
            </div>
        </div>
    );
}

export default MovieContainer;
