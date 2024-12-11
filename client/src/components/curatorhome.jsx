import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaSignOutAlt } from 'react-icons/fa';
import Managearts from './ManageArts';

function CuratorHome() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();

  // Function to get a dynamic greeting based on time of day
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log(storedUser); // You were logging `localStorage.getItem('user')`, which is a string. Use `storedUser` here.

    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="curatorhome">
      <nav>
        <h1>Arteon</h1>
        <button className="fab-sign-out" onClick={handleSignOut}>
          <FaSignOutAlt />
        </button>
      </nav>

      {/* Vertical Dashboard (Sidebar) */}
      <div className="dashboard">
        <ul>
          <h1>Dashboard</h1>
          <li><a href="#manage-Exhibition" onClick={() => handleSectionChange('manage-exhibition')}>Manage Existing  Exhibition</a></li>
          <li><a href="#manage-Arts" onClick={() => handleSectionChange('manage-arts')}>NEW EXHIBITION</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-frame">
        {user ? (
          <h2>{getGreeting()}, {user.username}!</h2>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>

      {/* Dynamically Render Sections */}
      <div className={`section ${activeSection === 'manage-exhibition' ? 'active' : ''}`}>
        {activeSection === 'manage-exhibition' && (
          // Add component for managing exhibitions (e.g., <ManageExhibition />)
          <div>Manage Exhibition Content</div>
        )}
      </div>

      <div className={`section ${activeSection === 'manage-arts' ? 'active' : ''}`}>
        {activeSection === 'manage-arts' && (
          // Add component for managing artworks (e.g., <ManageArtworks />)
          <Managearts/>
        )}
      </div>
    </div>
  );
}

export default CuratorHome;
