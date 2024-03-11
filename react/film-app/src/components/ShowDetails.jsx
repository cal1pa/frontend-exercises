import './ShowDetails.css'
import React, { useState, useEffect } from 'react';

function ShowDetails() {
    const [show, setShow] = useState(null);
    const [cast, setCast] = useState([]);
    const [showCast, setShowCast] = useState(false);

    useEffect(() => {
        fetch('https://api.tvmaze.com/singlesearch/shows?q=shameless')
            .then(response => response.json())
            .then(data => {
                setShow(data);
                return fetch(`https://api.tvmaze.com/shows/${data.id}?embed=cast`);
            })
            .then(response => response.json())
            .then(data => {
                setCast(data._embedded.cast);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="container">
            {show && (
                <>
                    <h1>{show.name}</h1>
                    <img src={show.image.original} alt="Show image" />
                    <div className="show-details">
                        <p><strong>Genres:</strong> {show.genres.join(', ')}</p>
                        <p><strong>Status:</strong> {show.status}</p>
                        <p><strong>Rating:</strong> {show.rating.average}</p>
                        <p><strong>Official Site:</strong> <a href={show.officialSite} target="_blank" rel="noopener noreferrer">Visit</a></p>
                        <p dangerouslySetInnerHTML={{ __html: show.summary }} />
                    </div>
                    <button className="button" onClick={() => setShowCast(!showCast)}>{showCast ? 'Hide Cast' : 'Show Cast'}</button>
                    {showCast && (
                        <div className="cast-details">
                            <h2>Cast</h2>
                            <ul>
                                {cast.map(({ person, character }) => (
                                    <li key={person.id}>{person.name} as {character.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ShowDetails;
