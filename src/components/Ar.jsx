import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import './Ar.css';

function Ar() {
  const { At_id } = useParams();
  const [attractionData1, setAttractionData1] = useState({});
  const [attractionData2, setAttractionData2] = useState({});
  const [attractionData3, setAttractionData3] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAttractionData = async () => {
      try {
        const response1 = fetch(`http://localhost:3333/Ardatad/${At_id}`);
        const response2 = fetch(`http://localhost:3333/Armarker/${At_id}`);
        const response3 = fetch(`http://localhost:3333/Arlocation/${At_id}`);
        const [data1, data2, data3] = await Promise.all([response1, response2, response3]);
        const result1 = await data1.json();
        const result2 = await data2.json();
        const result3 = await data3.json();

        if (result1.status === 'ok' && result2.status === 'ok') {
          setAttractionData1(result1.attraction);
          setAttractionData2(result2.attraction);
          setAttractionData3(result3.attraction);
          setIsLoading(false);
        } else {
          console.error('Error fetching attraction data');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching attraction data:', error);
        setIsLoading(false);
      }
    };

    fetchAttractionData();
  }, [At_id]);

  return (
    <div>
      <section className="blog">
        <br/>
        <div className="back">
          <Link to={`/Attraction/${At_id}`}>Back</Link>
        </div>
        <Container className="blogcon" maxWidth="md">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <a className = "Goshow" href={attractionData2.imageMark }>Show Marker</a>
              <div className="attraction-details">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="attraction-item">
                    <img
                      src={attractionData1[`url_image${index}`]}
                      alt={`Attraction ${index}`}
                      style={{ width: '300px', height: '200px' }}
                    />
                    <div className="nameAr">
                      <h1>{attractionData1[`name${index}`]}</h1>
                    </div>
                    <div className="attraction-buttons">
                      <Link to={attractionData2[`url${index}`]} target="_blank">
                        AR-marker
                      </Link>
                      <Link to={attractionData3[`urll${index}`]} target="_blank">
                        AR-location
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

export default Ar;
