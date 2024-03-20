import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Button } from '@mui/material';
import './admin.css';

function AdminPage() {
  const [userRole, setUserRole] = useState('');
  const [attractions, setAttractions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:3333/attractions');
      const data = await response.json();

      if (data.status === 'ok') {
        setSearchResults(data.attractions);
      } else {
        console.error('Error fetching attractions:', data.message);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  useEffect(() => {
    handleSearch();
    const userRoleFromLocalStorage = localStorage.getItem('userRole');
    if (userRoleFromLocalStorage === 'member') {
      window.location = '/memberPage/index';
    } else if (userRoleFromLocalStorage === 'admin') {
      setUserRole(userRoleFromLocalStorage);
    } else {
      window.location = '/';
    }
  }, []);

  async function handleDeleteAttraction(At_id) {
    try {
      const confirmed = window.confirm('คุณแน่ใจหรือไม่ที่ต้องการลบแหล่งท่องเที่ยวนี้?');
      if (!confirmed) return;

      const response = await fetch(`http://localhost:3333/deleteAt/${At_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        alert('การลบแหล่งท่องเที่ยวไม่สำเร็จ!');
      } else {
        alert('ลบแหล่งท่องเที่ยวสำเร็จ!');
        window.location.reload();
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบแหล่งท่องเที่ยว:', error.message);
    }
  }

  function handleLogout() {
    localStorage.removeItem('userRole');
    window.location = '/';
  }

  return (
    <div>
      <div className="sidebar">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <div className="home">
        <div className='btu2'>
          <Link to='/AddAtt'>
            <button className='crAt'>สร้างแหล่งท่องเที่ยว</button>
          </Link>
          <Link to='/Delete'>
            <button className='deleteRe'>ลบรีวิว</button>
          </Link>
        </div>
        {searchResults.length > 0 ? (
          searchResults
            .filter((attraction) =>
              attraction.At_name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((attraction) => (
              <div key={attraction.At_name}>
                <CardContent className='list'>
                  <div>
                    <h3>{attraction.At_name}</h3>
                    <p>{attraction.At_details}</p>
                    <img
                      src={attraction.At_image}
                      alt={attraction.At_name}
                      style={{ width: '200px', height: '150px' }}
                    />
                    <Link className='editbut' to={`/EditAttraction/${attraction.At_id}`}>แก้ไข</Link>
                    <Button className='deletbut' onClick={() => handleDeleteAttraction(attraction.At_id)}>ลบ</Button>
                  </div>
                </CardContent>
              </div>
            ))
        ) : (
          <p>No search results found</p>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
