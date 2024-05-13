import React from 'react';
import './SongList.css';

export default function BookList(props) {
    const {image, video, movie_title, year_of_release, genre ,imdb_rating} = props;
    const handleButtonClick = () => {
        window.open(video, '_blank');
    };
    return (
        <div className='main'>
            <img className='image' src={image} alt='movie'/>
            <div>
                <h3>{movie_title}</h3>
                <p>{year_of_release}</p>
                <p>IMDB: {imdb_rating}</p>
                <p>genre: {genre}</p>
                <button className='bttn' onClick={handleButtonClick}>Watch Now</button>
            </div>
        </div>
    )
}
