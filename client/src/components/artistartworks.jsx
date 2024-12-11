import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArtistArtwork = ({ user }) => {
  const [artworks, setArtworks] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      // Fetch artworks for the user
      axios
        .get(`http://localhost:2024/Arteon/artworks/user/${user.id}`)
        .then((response) => {
          setArtworks(response.data); // Store fetched data
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch artworks');
          setLoading(false);
        });
    }
  }, [user]);

  const cardStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  };

  const card = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    width: '250px',
    textAlign: 'center',
    backgroundColor: '#fff',
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  };

  const infoStyle = {
    padding: '10px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    color: '#333',
    textAlign: 'left', // Align text to the left for better readability
  };

  const formatDescription = (description) => {
    if (!description) return 'Description not available';
    const descriptionParts = description.split('|'); // Assuming `|` is used as a delimiter
    return descriptionParts.map((part, idx) => (
      <p key={idx} style={{ margin: '5px 0' }}>
        {part.trim()}
      </p>
    ));
  };

  return (
    <div className="artworks-container">
      <h2 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', marginBottom: '20px' }}>
        My Artworks
      </h2>
      {loading ? (
        <p>Loading artworks...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          
          <div style={cardStyle}>
            {artworks.galleryImages && artworks.galleryImages.length > 0 ? (
              artworks.galleryImages.map((imageUrl, index) => (
                <div key={index} style={card}>
                  <img
                    src={imageUrl}
                    alt={`Artwork ${index + 1}`}
                    style={imageStyle}
                  />
                  <div style={infoStyle}>
                    {formatDescription(artworks.galleryImagesDescriptions[index])}
                  </div>
                </div>
              ))
            ) : (
              <p>No artworks found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistArtwork;
