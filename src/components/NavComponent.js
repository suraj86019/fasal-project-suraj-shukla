import React, { useState, useEffect } from 'react';
import './Components.css';
import homeimg from '../images/homeImage.jpeg';
import movielogo from '../images/movie-app-logo.svg';
import { NavLink, useHistory } from 'react-router-dom';
 import Tippy from '@tippyjs/react';
import 'tippy.js/themes/translucent.css';
import 'tippy.js/dist/tippy.css';

function Nav() {
    const [transform, setState] = useState(false);
    const [navstate, setNavState] = useState(false);
    const searchHistory = useHistory(); 

    useEffect(() => {
        if(window.location.pathname === "/") {
            setState(true);
        }
        else if(window.location.pathname !== "/") {
            setState(false);
        }
    })
    
    function search(e) {
        let searchInput = document.querySelector("#searchInput").value;

        if(e.keyCode === 13) {
            setState(false);
            searchHistory.push(`/search/${searchInput.replace(/\s+/g, "-").toLowerCase()}`);
        }
    }
    function smallSearch(e) {
        let searchInput = document.querySelector("#smallSearchInput").value;

        if(e.keyCode === 13) {
            setState(false);
            searchHistory.push(`/search/${searchInput.replace(/\s+/g, "-").toLowerCase()}`);
        }
    }
    
        return (
            <>
                <nav className={transform ? "navbar navbar-dark bg-dark fixed-top h-100 navbar-expand-sm" : "navbar navbar-dark bg-dark sticky-top navbar-expand-sm d-none d-lg-flex"} style={transform ? {background: `url(${homeimg})`} : {transition: "height 10s ease !important"}} id="navbar">
                    <div className={transform ? "container-fluid fixed-top mt-2" : "d-none"}>
                       <img src={movielogo} height="40" width="40" className="navbar-brand mr-auto"/>
                       <div className="ml-auto d-flex align-items-center justify-content-center">
                               <button className="btn">
                                    <span className="far fa-bookmark mr-2 text-white"></span>
                                    <span className="d-none d-lg-inline text-white mx-5" onClick={()=>{window.location.href='/login'}}>Login</span>
                                    <span className="d-none d-lg-inline text-white">Wish List</span>
                               </button>
                        </div>
                    </div>
                    <NavLink to="/" >
                        <div className="dFlex" style={{height: "40px", width: "150px"}}>
                            <img src={movielogo} height="40" width="40" className={transform ? "navbar-brand mr-auto d-none" : "navbar-brand"}/>
                            <span className={transform ? "d-none" : "text-white fmont-1 d-none d-md-inline"}>Searcher</span>
                        </div>
                        </NavLink>
                    <div className="container mr-0 pr-0">
                         <div className="row-fluid d-flex justify-content-center w-100">
                            <div className="col-10">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text" style={transform ? {background: "white", border: "none"} : {background: "#FFAE00", border: "none"}}>
                                            <span className={transform ? "fa fa-search" : "fa fa-search text-white"}></span>
                                        </div>
                                    </div>
                                    <input type="text" id="searchInput" className={transform ? "form-control pl-0 shadow-none" : "form-control"} onKeyDown={search} style={transform ? {height: "60px", border: "none"} : {border: "none"}}
                                     spellCheck="false" autoComplete="off" placeholder="Search A Movie"/>
                                </div>
                            </div>
                            <div className={transform ? "col d-none d-sm-flex align-items-center justify-content-center" : "col-2 d-flex align-items-center justify-content-center"}>
                               <button className={transform ? "btn d-none" : "btn"} >
                                    <span className="far fa-bookmark mr-2 text-white"></span>
                                    <NavLink to="/login" className="t-decoration-none"><span className="d-none d-lg-inline text-white">Login</span></NavLink>
                               </button>
                               <button className={transform ? "btn d-none" : "btn"} >
                                    <span className="far fa-bookmark mr-2 text-white"></span>
                                    <NavLink to="/wishlist" className="t-decoration-none"><span className="d-none d-lg-inline text-white">Wish List</span></NavLink>
                               </button>
                            </div>
                         </div>
                    </div>
                </nav>
                <nav className={navstate ? "navbar navbar-dark bg-dark sticky-top d-none" : "navbar navbar-dark bg-dark sticky-top d-flex d-lg-none"}>
                    <div className="container-fluid">
                            <div className="col-2 dFlex">
                                <NavLink to="/"><img src={movielogo} width="40" height="40" className="navbar-brand"/></NavLink>
                                <span className="text-white fmont-1 d-none d-md-inline">Searcher</span>
                            </div>
                            <div className="col-10">
                                <div className="row dFlex justify-content-end">
                                    <div className="col-12 dFlex justify-content-end p-0">
                                        <Tippy content="Search" theme="translucent" interactiveBorder={10} placement="bottom">
                                            <span className="nav-link t-decoration-none" style={{cursor: "pointer"}}><span className="fa fa-search text-white" onClick={() => setNavState(true)}></span></span>
                                        </Tippy>
                                        <NavLink to="/wishlist">
                                            <Tippy content="WishList" theme="translucent" interactiveBorder={10} placement="bottom">
                                                <span className="nav-link t-decoration-none"><span className="fa fa-bookmark text-white"></span></span>
                                            </Tippy>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                    </div>
                </nav>
                <nav className={navstate ? "navbar navbar-dark bg-dark sticky-top d-flex d-lg-none" : "navbar navbar-dark bg-dark sticky-top d-none"}>
                    <div className="container-fluid p-0">
                        <div className="col-1 dFlex">
                            <NavLink to="/"><img src={movielogo} width="40" height="40" className="navbar-brand"/></NavLink>
                        </div>
                        <div className="col-10 dFlex">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text" style={{background: "#FFAE00", border: "none"}}>
                                        <span className="fa fa-search text-white"></span>
                                    </div>
                                </div>
                                <input type="text" id="smallSearchInput" className="form-control" onKeyDown={smallSearch} style={{border: "none"}}
                                    spellCheck="false" autoComplete="off" placeholder="Search A Movie"/>
                            </div>
                        </div>
                        <div className="col-1 ml-auto">
                                <span className="fas fa-window-close torange menu-close-icon" onClick={() => setNavState(false)} style={{cursor: "pointer"}}></span>
                        </div>
                    </div>
                </nav>
            </>
        );
}

export default Nav;