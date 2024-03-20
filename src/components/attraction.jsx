import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import './attraction.css';

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

function Attraction() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(true);
  const [reviews, setReviews] = useState([]);

  const handleSearch = async () => {
    setIsSearching(true);

    try {
      // Fetch attractions
      const responseAttractions = await fetch('http://localhost:3333/attractions');
      const dataAttractions = await responseAttractions.json();

      // Fetch reviews
      const responseReviews = await fetch('http://localhost:3333/reviewAt2');
      const dataReviews = await responseReviews.json();

      if (dataAttractions.status === 'ok' && dataReviews.status === 'ok') {
        const attractions = dataAttractions.attractions;
        const reviews = dataReviews.ratings;
       
        // Map reviews to attractions based on At_id
        const attractionsWithReviews = attractions.map((attraction) => {
          const matchingReviews = reviews.filter((review) => review.At_id === attraction.At_id);
          const averageRating = calculateAverageRating(matchingReviews);
          return { ...attraction, averageRating };
        });

        setSearchResults(attractionsWithReviews);
      } else {
        console.error('Error fetching attractions or reviews');
      }
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  useEffect(() => {
    handleSearch();
  }, []);

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleCardContentClick = () => {
    alert('ขอให้สนุกกับการเลือกรับชม!');
  };

  // Function to calculate average rating
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }
    
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
    
  };
 
  return (
    <>
      <Navbar />
      <Container classname="mdd" maxWidth="md">
        <br/>
        <h1>Search for Tourist Attractions</h1>
        
        <TextField className='ppo'
          label="Search Query"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleQueryChange}
        />
        {isSearching && <p>Searching...</p>}
        <br/>
        {searchResults.length > 0 ? (
          <div className="ggg">
            <br/>
            <h2>Search Results:</h2>
            <br/>
            {searchResults
              .filter((attraction) =>
                attraction.At_name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((attraction) => (
                <Link key={attraction.At_name} to={`/Attraction/${attraction.At_id}`} style={linkStyle}>
                  <Card className='biger'
                    style={{
                      marginBottom: '16px',
                      border: '5px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <CardContent className="list" onClick={handleCardContentClick}>
                      <div>
                        <h3>{attraction.At_name}</h3>
                        <p>{attraction.At_details}</p>
                        <img
                          src={attraction.At_image}
                          alt={attraction.At_name}
                          style={{ width: '600px', height: '450px' }}
                        />
                      </div>
                      <div className="gre">
                        {Array.from({ length: 5 }, (_, index) => (    
                          <span key={index}>{index + 1 <= attraction.averageRating ? '★' : '☆'}</span>
                        ))}
                  
                        <Link to={`/ReviewAt/${attraction.At_id}`} style={linkStyle}>
                          <button className='wer'>Write Review</button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </Container>
    </>
  );
}

export default Attraction;
