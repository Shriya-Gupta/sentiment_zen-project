import React from 'react'
import "./SongList.css"

export default function BookList(props) {
    const {title, author, image, read_now} = props;
    const handleButtonClick = () => {
        window.open(read_now, '_blank');
    };
    return (
        <div className='main'>
            <img className='image' src={image} />
            <div>
                <h3>{title}</h3>
                <p>{author}</p>
                <button className='bttn' onClick={handleButtonClick}>
                    Read Now
                </button>
            </div>
        </div>
    )
}
