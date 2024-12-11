import React from 'react';
import './exhibition.css'
import art1 from '../assets/images/landscape.png';
import art2 from '../assets/images/landscape2.png';
import art3 from '../assets/images/butterfly.png';


const exhibitions = [
  { id: 1, title: 'Abstract Paintings', venue: 'Hyderabad', image: art1 },
  { id: 2, title: 'Oil Paintings', venue: 'Guntur', image:art2 },
  { id: 3, title: 'Water Colour', venue: 'Vijaywada', image: art3 },
];

const Exhibition = () => {
  return (
    <div className="exhibition-section">
      <h1>Current Exhibitions</h1>
      <div className="gallery">
        {exhibitions.map((exhibit) => (
          <div key={exhibit.id} className="gallery-item">
            <img src={exhibit.image} alt={exhibit.title} />
            <p>{exhibit.title} at {exhibit.venue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Exhibition;
