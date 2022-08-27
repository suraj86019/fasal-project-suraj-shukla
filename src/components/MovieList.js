import React, { useState, useEffect, Suspense } from 'react';
import defaultimg from '../images/notfound.svg';
import binocular from '../images/binocular.svg';
import './Components.css';
import { useHistory } from 'react-router-dom';

function MovieList(props) {
    const [movieData, setMovieData] = useState(null);
    const [pageCount, setPageCount] = useState(1);

    const history = useHistory();

    useEffect(() => {
        let url = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${props.searchValue.replace(/-+/g, " ")}&page=${pageCount}`;
        console.log(url);
        let xml = new XMLHttpRequest();
        xml.open("GET", url, true);
        xml.onload = () => {
            fetchData(xml.response);
        }
        xml.send();
        
        if(!sessionStorage.pathname) {
            sessionStorage.setItem("pathname", JSON.stringify(`/search/${props.searchValue}`));
        }
        
        if(sessionStorage.pathname) {
            let previousPathname = JSON.parse(sessionStorage.getItem("pathname"));
            if(window.location.pathname !== previousPathname) {
                setPageCount(1);
                sessionStorage.setItem("pathname", JSON.stringify(`/search/${props.searchValue}`));
            }
        }
        return () => xml.abort();
    })

    function fetchData(data) {
        setMovieData(data);
    }

    let movie_D = JSON.parse(movieData);
    let movies;
    let pageBtns;
    let count = 0;
    if(movieData !== null) {
        if(movie_D.Response === "True") {
        movies = movie_D.Search.map((movie) => {
                return (
                    <div key={movie.imdbID} className="card movie-card" onClick={() => history.push(`/id/${movie.imdbID}`)} style={movie_D.Search.length < 10 ? {height: "auto"} : {height: "22.5%"}}>
                        <img src={movie.Poster === "N/A" ? defaultimg : movie.Poster} alt={`Movie: ${movie.Title}`} style={{width: "100%", height: "80%"}} className="img-fluid card-img-top" />
                        <div className="card-img-overlay">
                            <i className="fas fa-angle-double-right text-white h1"></i><br/><br/>
                            <span className="text-white d-none d-sm-flex fpoppins-1">Click to get more details<br/>on<br/>{movie.Title}</span>
                        </div>
                        <div className="card-body">
                            <div className="col-12 px-0">
                                <h6 className="card-title text-white">{movie.Title.length > 18 ? movie.Title.replace(movie.Title.substring(18, movie.Title.length), "...") : movie.Title}</h6>
                            </div>
                            <div className="card-text bg-primary d-none d-sm-block card-details-text">
                                <span className="text-muted float-left">{movie.Type}</span>
                                <span className="text-muted float-right">{movie.Year}</span>
                            </div>
                        </div>
                    </div>
                );  
            }
        );
        pageBtns = (
                <div className="col-12 dFlex justify-content-between">
                    {pageCount > 1 ? <button className="btn btn-outline-warning" onClick={() => setPageCount(pageCount-1)}><i className="fa fa-arrow-left pr-2"></i>Previous</button> : <div></div>}
                    {movie_D.Search.length < 10 ? <div></div> : <button className="btn btn-outline-warning" onClick={() => setPageCount(pageCount+1)}><i className="fa fa-arrow-right pr-2"></i>Next</button>}
                </div>
            );
        }
        else if(movie_D.Response === "False") {
            movies = (
                <div className="dFlexColSpaced w-100 w-sm-50 h-50">
                    <img src={binocular} width="200" height="100" alt="not found image" />
                    <h2>Movie Not Found!</h2>
                </div>
            );
        }
    }

    return (
        <div className="container-fluid" style={{paddingTop: "20px", minHeight: "91.5vh"}}>
            <div className="row px-0 d-flex align-items-center justify-content-center">
                <div className="col-12 mb-1">
                    <span style={{font: "1em Poppins, sans-serif"}}>Search Results for {props.searchValue.replace(/-+/g, " ")}</span>
                </div>
                <div className="col-12 d-flex justify-content-center">
                    <div className="movie-list-container">
                        {movieData !== null ? movies : <div></div>}
                        {movieData !== null && movie_D.totalResults > 10 ? pageBtns : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieList;