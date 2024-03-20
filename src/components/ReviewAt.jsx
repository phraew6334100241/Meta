import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ReviewAt.css';

function ReviewAt() {
  const { At_id } = useParams();
  const [note_review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [attractionData, setAttractionData] = useState({});
  const [reviews, setReviews] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3333/attractions/${At_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'ok') {
          setAttractionData(data.attraction);
        } else {
          console.error('Error fetching attraction data');
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [At_id]);

  useEffect(() => {
    const userRoleFromLocalStorage = localStorage.getItem('userRole');
    const storedId = localStorage.getItem('id');
    const storedName = localStorage.getItem('name');

    if (userRoleFromLocalStorage === 'member' && storedId && storedName) {
      setIsMember(true);
      setId(storedId);
      setName(storedName);

      fetch(`http://localhost:3333/checkRating/${At_id}?id=${storedId}`)
        .then((response) => response.json())
        .then((data) => {
          setHasReviewed(data.hasRated);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      setIsMember(false);
    }

    fetch(`http://localhost:3333/reviewAt/${At_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'ok') {
          setReviews(data.review);
          setScores(data.scores);
          setHasReviewed(true);
        } else {
          console.error('Error fetching reviews data');
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [At_id, navigate]);

  const handleReview = () => {
    if (note_review && id && rating > 0) {
      const jsonData = {
        At_id: At_id,
        note_review: note_review,
        rating: rating,
        id: id,
        name: name,
      };

      fetch('http://localhost:3333/reviewAt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'ok') {
            setHasReviewed(true);
            setReview('');
            setRating(0);
            alert('Review submitted successfully!');
            window.location.reload();
          } else {
            alert('Failed to submit review');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('An error occurred while submitting the review');
        });
    } else {
      alert('Please provide a review, ensure you are logged in, and give a rating.');
      navigate('/login');
    }
  };

  return (
    <div className="container">
      <div>
        <h1>{attractionData.At_name}</h1>
        <img src={attractionData.At_image} style={{ width: '600px', height: '450px' }} alt="Attraction" />
        <p>{attractionData.At_details}</p>
        <p>{attractionData.At_address}</p>
        <textarea
          value={note_review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
        ></textarea>
        <div>
          <p>Rate this attraction:</p>
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              style={{
                cursor: 'pointer',
                marginRight: '5px',
                fontSize: '30px',
                color: value <= rating ? 'gold' : 'gray',
              }}
              onClick={() => setRating(value)}
            >
              ★
            </span>
          ))}
        </div>
        <button onClick={handleReview}>Submit Review</button>
      </div>
      {hasReviewed && (
        <div>
          <h2>All Reviews</h2>
          {reviews.map((review, index) => (
            <div className="list-item" key={index}>
              <p>Reviewed by: {review.name}</p>
              <p>{review.note_review}</p>
              <p>
                {' '}
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    style={{
                      marginRight: '5px',
                      fontSize: '20px',
                      color: value <= (scores[index] && scores[index].rating) ? 'gold' : 'gray',
                    }}
                  >
                    {value <= (scores[index] && scores[index].rating) ? '★' : '✮'}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewAt;
