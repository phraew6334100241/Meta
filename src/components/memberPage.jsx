import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './MemberPage.css'; // Import your CSS file

function MemberPage() {
  const [userRole, setUserRole] = useState('');
  const [userData, setUserData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3333/user/${id}`);
        const data = await response.json();
  
        if (data.status === 'ok') {
          const user = data.user[0];
          const userData = {
            name: user.name || 'Loading...',
            phone: user.phone || 'Loading...',
            birthday: user.birthday || 'Loading...',
            Lifestyle: user.Lifestyle || 'Loading...',
            imageFile: user.imageFile ? `http://localhost:3333/images/${user.imageFile}` : null,
          };
          setUserData(userData);
        } else {
          console.error('Error fetching user data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    const userRoleFromLocalStorage = localStorage.getItem('userRole');
  
    if (userRoleFromLocalStorage === 'admin') {
      window.location = '/AdminPage/index';
    } else if (userRoleFromLocalStorage === 'member') {
      setUserRole(userRoleFromLocalStorage);
      fetchUserData();
    } else {
      window.location = '/';
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="member-page-container">
        <div className="header">
          <h1>Welcome to the Member Page</h1>
        </div>
        <div className="user-info">
        {userData.imageFile ? (
            <img src={userData.imageFile} alt="User Profile" />
          ) : (
            <p>Loading...</p>
          )}
          <p>Name: {userData.name}</p>
          <p>Phone: {userData.phone}</p>
          <p>Birthday: {userData.birthday}</p>
          <p>Lifestyle: {userData.Lifestyle}</p>
        </div>
        <div className="edit-profile-button">
          <p>Edit personal information on this page !!!</p>
          <Link to={`/EditProfile/${id}`}>
            <button>Edit Profile</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default MemberPage;
