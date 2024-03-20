import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [idMember, setIdMember] = useState("");

  const navigate = useNavigate(); // Create a navigate function

  const handleClick = () => setClick(!click);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    const memberId = localStorage.getItem('id');

    if (token && userRole && memberId) {
      setLoggedIn(true);
      setIdMember(memberId);
    }

  }, []);

  window.addEventListener('resize', showButton);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login'); // Use navigate to navigate
    setLoggedIn(false);
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <div to='/' className='navbar-logo'>
            Guide With AR <i className="fab fa-gripfire"></i>
          </div>

          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/Attraction' className='nav-links'>
                Attraction
              </Link>
            </li>
            {loggedIn ? (
              <li className='nav-item'>
                <Link to={`/MemberPage/index/${idMember}`} className='nav-links'>
                Profile Setting
                </Link>
              </li>
            ) : null}
          </ul>
          {loggedIn ? (
            <>
              <Button onClick={handleLogout} variant="contained" sx={{ mx: 1.5 }}>
                Logout
              </Button>
            </>
          ) : (
            <Button component={Link} to="/login" variant="contained" buttonStyle='btn--outline' sx={{ mx: 1.5 }}>
              Login
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
