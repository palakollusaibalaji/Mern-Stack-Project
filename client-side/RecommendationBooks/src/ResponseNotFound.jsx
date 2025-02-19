import React from 'react';
import{NavLink} from "react-router-dom"
function ResponseNotFound() {
    return (
        <div>
            <h1>404 NOT FOUND</h1>
            <NavLink to={"/"}><button>Home</button></NavLink>     
        </div>
    );
}

export default ResponseNotFound;