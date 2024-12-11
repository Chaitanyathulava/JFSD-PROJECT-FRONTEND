import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import '../components/visitorhome.css';

function VisitorHome() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('home'); // Track which section is active
  const navigate = useNavigate();

  // Function to get a dynamic greeting based on time of day
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="visitor-home">
      <nav className='visitor-nav'>
        <h1>Arteon</h1>
        <button className="fab-sign-out" onClick={handleSignOut}>
          <FaSignOutAlt />
        </button>
      </nav>

      <div className="dashboard">
        <h2>Dashboard</h2>
        <ul>


        <li className={activeSection === 'exhibitions' ? 'active' : ''}>
            <a onClick={() => handleNavClick('exhibitions')}>
              Exhibitions
            </a>
          </li>
          
          <li className={activeSection === 'artists' ? 'active' : ''}>
            <a onClick={() => handleNavClick('artists')}>
              Artists
            </a>
          </li>
          
          
          <li className={activeSection === 'profile' ? 'active' : ''}>
            <a onClick={() => handleNavClick('profile')}>
              Update my profile 
            </a>
          </li>
        </ul>
      </div>

      <div className="main-frame">
        <h2>{getGreeting()} Visitor!</h2>

        <div className={`section ${activeSection === 'home' ? 'active' : ''}`}>
          {activeSection === 'home' && <div>Welcome to the Home Page!</div>}
        </div>

        <div className={`section ${activeSection === 'view-artworks' ? 'active' : ''}`}>
          {activeSection === 'view-artworks' && <div>View Artworks Content</div>}
        </div>

        <div className={`section ${activeSection === 'exhibitions' ? 'active' : ''}`}>
          {activeSection === 'exhibitions' && <div>Exhibitions Content</div>}
        </div>

        <div className={`section ${activeSection === 'profile' ? 'active' : ''}`}>
          {activeSection === 'profile' && <div>Profile Content</div>}
        </div>
      </div>
    </div>
  );
}

export default VisitorHome;
