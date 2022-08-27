import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Components.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/translucent.css';
import 'tippy.js/dist/tippy.css';
import cantfindimg from '../images/binocular-2.svg';

function WishList() {
    const [placement, setPlacement] = useState("right");
    const history = useHistory();
    let bookmarkedData;
    let wdata = localStorage.getItem("wishlist_data") ? JSON.parse(localStorage.getItem("wishlist_data")) : "whatsup";

    let media = window.matchMedia("(max-width: 770px)");
    useEffect(() => {
        if(media.matches) {
          setPlacement("top");
        }
    }, [media])

    function deleteData(d) {
        let currentData = JSON.parse(localStorage.getItem("wishlist_data"));
        for(let i = 0; i < currentData.length; i++) {
            if(currentData[i].imdbID === d) {
                currentData.splice(currentData.indexOf(currentData[i]), 1);
                localStorage.setItem("wishlist_data", JSON.stringify(currentData));
                history.push("/wishlist");
            }
        }
    }
    
    if(localStorage.getItem("wishlist_data")) {
        bookmarkedData = JSON.parse(localStorage.getItem("wishlist_data")).map((data) => {
            return (
                <div key={data.imdbID} className="row mb-1">
                    <div className="media pl-2 py-2 w-100 media-row" style={{background: "#222223", border: "none", borderBottom: "1.5px solid #1e1e1e"}}>
                        <img src={data.poster} className="img-fluid rounded" style={{width: "100px", height: "100px"}} />
                        <div className="media-body dFlex" style={{height: "100%"}}>
                            <div className="col-8 h-100 px-0" onClick={() => history.push(`/id/${data.imdbID}`)}>
                                <div className="col-12 pl-4">
                                    <Tippy content={data.title} theme="translucent" placement={placement} interactiveBorder={20} className="fmont-0-8">
                                        <span className="fmont-1-1 mt-2 torange-light">{data.title.length >= 19 ? data.title.replace(data.title.substring(16, data.title.length), "...") : data.title}</span>
                                    </Tippy>
                                </div>
                                <div className="col-12 pl-4">
                                    <span className="text-white fmont-1-1 wishlist-plot">{data.plot}</span>
                                </div>
                            </div>
                            <div className="col-4 h-100 px-0 mx-0 d-flex delete-btn align-items-center justify-content-center flex-column flex-md-row">
                                <div className="col-12 col-md-4 b-notification dFlex">
                                    <Tippy theme="translucent" interactiveBorder={30} content="Added To WishList">
                                        <i className="fas fa-bookmark text-primary"></i>
                                    </Tippy>
                                </div>
                                <div className="col-12 col-md-8 d-flex delete-btn dFlex">
                                    <button className="btn btn-outline-warning" onClick={() => deleteData(data.imdbID)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    if(wdata.length === 0 || !localStorage.getItem("wishlist_data")) {
        bookmarkedData = (
            <div className="row dFlexColSpaced mx-auto mt-5 text-center empty-container" style={{background: "#383838", height: "50vh", width: "50%", borderRadius: "10px", boxShadow: "10px 10px 10px #1c1c1c"}}>
                <img src={cantfindimg} width="150" height="150" alt="can't find wishlist data" />
                <span className="fmont-1-1 torange">Nothing saved to your wishlist yet</span>
            </div>
        )
    }

    let wishlistHeading = (
        <div className="row" style={{height: "50px"}}>
            <div className="col-12 dFlex justify-content-start">
                <h4 className="fpoppins-1-2 text-white mt-2">My WishList</h4>
            </div>
        </div>
    )

    return (
        <div className="container-fluid" style={{background: "#2b2b2b", minHeight: "91.5vh", height: "auto", paddingBottom: "10px"}}>
            {wishlistHeading}
            <div>{bookmarkedData}</div>
        </div>
    );
}

export default WishList;