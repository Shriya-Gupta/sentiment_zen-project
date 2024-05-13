import React from 'react';
import MovieList from './MovieList';
import movieData from './movieData';

export default function Movie(props) {
    const { emotionLabel } = props;
    const filteredMovies = movieData.filter(movie => movie.emotion === emotionLabel);
    return (
      <>
        <h2>Feeling {emotionLabel} - Here are some movies</h2>
        {filteredMovies.map(movie => (
          <MovieList image={movie.image} video={movie.video} movie_title={movie.movie_title} year_of_release={movie.year_of_release} genre={movie.genre} imdb_rating={movie.imdb_rating} />
        ))}
  
      </>
    )
}
