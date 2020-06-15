import React from 'react';
import SearchBox from './SearchBox';


function Nav({search}){
    return (
        <nav className = "navbar navbar-expand navbar-light bg-light">
            <div className="navbar-collapse row" id="navbarNav">
                 <SearchBox search={search} />
            </div>
        </nav>
    );
}



export default Nav;