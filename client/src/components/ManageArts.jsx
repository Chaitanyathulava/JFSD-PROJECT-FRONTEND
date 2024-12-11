import React, { useState, useEffect } from 'react';

const ManageArts = () => {
  const [artists, setArtists] = useState([]); // Store the list of artists
  const [selectedArtistId, setSelectedArtistId] = useState(null); // Store selected artist ID
  const [galleryImages, setGalleryImages] = useState([]); // Store gallery images of selected artist
  const [selectedImages, setSelectedImages] = useState([]); // Store selected images for exhibition
  const [newExhibition, setNewExhibition] = useState({ name: '', startDate: '', endDate: '', description: '' }); // Form data for new exhibition
  const [exhibitionType, setExhibitionType] = useState('new'); // Track if we are creating a new exhibition or adding to an existing one

  // Fetch the list of artists
  useEffect(() => {
    fetch('http://localhost:2024/Arteon/Curator/artists')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setArtists(data);
        } else {
          console.error('API did not return an array of artists');
        }
      })
      .catch(error => console.error('Error fetching artists:', error));
  }, []);

  // Fetch gallery images when a new artist is selected
  useEffect(() => {
    if (selectedArtistId) {
      const selectedArtist = artists.find(artist => artist.id === selectedArtistId);
      if (selectedArtist) {
        setGalleryImages(selectedArtist.galleryImages);
      }
    }
  }, [selectedArtistId, artists]);

  // Handle the selection of images
  const handleImageSelect = (imageUrl) => {
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.includes(imageUrl)
        ? prevSelectedImages.filter((img) => img !== imageUrl)
        : [...prevSelectedImages, imageUrl]
    );
  };

  // Handle form input changes for new exhibition
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExhibition((prevExhibition) => ({
      ...prevExhibition,
      [name]: value,
    }));
  };

  // Handle exhibition submission
  const handleSubmitExhibition = () => {
    if (exhibitionType === 'new') {
      // Send the new exhibition data and selected images to the backend
      const exhibitionData = {
        ...newExhibition,
        artworks: selectedImages.map((imageUrl) => ({
          imageUrl,
          description: 'Image description', // Placeholder, can be customized later
          artistName: artists.find((artist) => artist.galleryImages.includes(imageUrl))?.username,
        })),
      };

      fetch('http://localhost:2024/Arteon/Curator/exhibitions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exhibitionData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Exhibition created:', data);
        })
        .catch((error) => console.error('Error creating exhibition:', error));
    } else {
      // Add to existing exhibition logic (you need to pass exhibitionId to your backend)
      console.log('Add to existing exhibition');
    }
  };

  return (
    <div>
      <h1>Manage Arts</h1>

      {/* Artist dropdown */}
      <select onChange={(e) => setSelectedArtistId(Number(e.target.value))} value={selectedArtistId || ''}>
        <option value="" disabled>Select an artist</option>
        {artists.map((artist) => (
          <option key={artist.id} value={artist.id}>
            {artist.username}
          </option>
        ))}
      </select>

      {/* Display gallery images if artist is selected */}
      {selectedArtistId && galleryImages.length > 0 && (
        <div>
          <h2>Gallery of {artists.find((artist) => artist.id === selectedArtistId)?.username}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {galleryImages.map((image, index) => (
              <div
                key={index}
                style={{
                  margin: '10px',
                  border: selectedImages.includes(image) ? '2px solid green' : '2px solid gray',
                  cursor: 'pointer',
                }}
                onClick={() => handleImageSelect(image)}
              >
                <img src={image} alt={`Gallery image ${index + 1}`} style={{ width: '200px', height: 'auto' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add to Existing Exhibition or New Exhibition */}
      <div>
        <button onClick={() => setExhibitionType('new')}>Create New Exhibition</button>
        <button onClick={() => setExhibitionType('existing')}>Add to Existing Exhibition</button>
      </div>

      {/* Form to create a new exhibition */}
      {exhibitionType === 'new' && (
        <div>
          <h2>Create New Exhibition</h2>
          <form>
            <label>
              Exhibition Name:
              <input
                type="text"
                name="name"
                value={newExhibition.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Start Date:
              <input
                type="date"
                name="startDate"
                value={newExhibition.startDate}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              End Date:
              <input
                type="date"
                name="endDate"
                value={newExhibition.endDate}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Description:
              <textarea
                name="description"
                value={newExhibition.description}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <button type="button" onClick={handleSubmitExhibition}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageArts;
