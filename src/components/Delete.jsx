import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import './Delete.css';
function Delete() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:3333/reviews`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.status === 'ok') {
          setReviews(data.reviews);
        } else {
          console.error('Error fetching reviews data');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchReviews();
  }, []);

  async function handleDelete(id) {
    try {
      const confirmed = window.confirm('คุณแน่ใจหรือไม่ที่ต้องการลบรีวิวนี้?');
      if (!confirmed) return; // หากไม่ยืนยันการลบ ให้ออกจากฟังก์ชัน
  
      const response = await fetch(`http://localhost:3333/deleteReview/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        alert('การลบรีวิวไม่สำเร็จ!');
      } else {
        setReviews(reviews.filter(review => review.id !== id));
        alert('ลบรีวิวสำเร็จ!');
        window.location.reload();
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบรีวิว:', error.message);
    }
  }
  
  return (
    <div>
      <Link className = 'LinkToAdmin'to ='/AdminPage/index'>Black</Link>
      <table className='table'>
        <thead>
          <tr>
            <th>No.</th>
            <th>ID</th>
            <th>Name</th>
            <th>Review</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='dataRe'>
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <tr key={review.id}>
                <td>{index + 1}</td>
                <td>{review.id}</td>
                <td>{review.name}</td>
                <td>{review.note_review}</td>
                <td>
                  <button className='DeletRe' onClick={() => handleDelete(review.no)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Delete;