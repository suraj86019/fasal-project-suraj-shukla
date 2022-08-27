import React from 'react';
import MovieContainer from './MovieContainer';
import MovieList from './MovieList';

function MovieWrapper({ match }) {
    console.log(match);
    return (
        <>
          <MovieContainer>
              <div className='col-12 col-lg-4 col-xl-3 px-0'>
              {/* <span>Hello There</span> */} {/*<SearchOptions /> component*/}
              </div>
              <div className='col-12 col-lg-8 col-xl-9 px-0'>
                    <MovieList searchValue={match.params.searchVal} />
              </div>
          </MovieContainer>
        </>
    );
}

export default MovieWrapper;