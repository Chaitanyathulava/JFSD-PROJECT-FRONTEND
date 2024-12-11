import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/submitartwork.css'

const SubmitArt = ({ user, onClose, onuploadartwork }) => {
  const [userId, setId] = useState(user?.id);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [artistName, setArtistName] = useState('');
  const [artType, setArtType] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user?.id) {
      setId(user.id);
    }
  }, [user]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setErrorMessage('');

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size exceeds 5MB. Please upload a smaller file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ArteonArtistArt');

    fetch('https://api.cloudinary.com/v1_1/dkpohryad/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const uploadedImageUrl = data.secure_url;
        setImageUrl(uploadedImageUrl);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        setErrorMessage('Failed to upload image. Please try again.');
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const artDetails = `Title: ${title} | Price: $${price} | Artist: ${artistName} | Art Type: ${artType}`;

    const newArt = {
      userId,         
      artDetails,     
      imageUrl,       
    };

    try {
      console.log("Submitting new artwork:", newArt);
      const result = await axios.post('http://localhost:2024/Arteon/submitart', newArt);
      console.log("Backend response:", result);

      if (result.data.success) {
        setSuccessMessage('Art submitted successfully!');
        onuploadartwork(newArt); 
      } else {
        setErrorMessage('Failed to submit art. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting art:', error);
      setErrorMessage('Failed to submit art. Please try again.');
    }
  };

  return (
    <div className="submit-art-form">
      <h3>Submit Your Artwork</h3>
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title of Art:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Price ($):</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
            min="0" 
          />
        </div>

        <div className="form-group">
          <label>Artist Name:</label>
          <input 
            type="text" 
            value={artistName} 
            onChange={(e) => setArtistName(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Type of Artwork:</label>
          <select 
            value={artType} 
            onChange={(e) => setArtType(e.target.value)} 
            required
          >
            <option value="">Select Art Type</option>
            <option value="Painting">Painting</option>
            <option value="Sculpture">Sculpture</option>
            <option value="Photography">Photography</option>
            <option value="Digital Art">Digital Art</option>
            <option value="Mixed Media">Mixed Media</option>
          </select>
        </div>

        <div className="form-group">
          <label>Artwork Image:</label>
          <input type="file" accept="image/*" onChange={handleFileUpload} required />
          {errorMessage && <p className="error">{errorMessage}</p>}
          {imageUrl && <img src={imageUrl} alt="Artwork" width="200" />}
        </div>

        <button className="submit-btn" type="submit">Submit Art</button>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default SubmitArt;
