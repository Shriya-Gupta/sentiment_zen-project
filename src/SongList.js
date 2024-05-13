import React from 'react'
import "./SongList.css"

export default function SongList(props) {
    const {image, play, title, singer, genre} = props;
    const handleButtonClick = () => {
        window.open(play, '_blank');
    };
    return (
        <div className='main'>
            <img className='image' src={image} />
            <div>
                <h3>{title}</h3>
                <p>Singer: {singer}</p>
                <p>Genre: {genre}</p>
                <button className='bttn'onClick={handleButtonClick}>Listen Now</button>
            </div>
        </div>
    )
}
