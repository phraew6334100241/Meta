import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import MyMap1 from './MyMap1';
import { Link } from 'react-router-dom';
import './attDetail.css';

function AttractionDetail() {
  const { At_id } = useParams();
  const [attractionDetail, setAttractionDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const fetchAttractionDetail = async () => {
    try {
      const response = await fetch(`http://localhost:3333/attractions/${At_id}`);
      const data = await response.json();
      if (data.status === 'ok') {
        setAttractionDetail(data.attraction);
        setImageUrls([
          data.attraction.At_image,
          data.attraction.At_image1,
          data.attraction.At_image2,
          data.attraction.At_image3,
          data.attraction.At_image4,
        ]);
        setIsLoading(false);
      } else {
        console.error('Error fetching attraction detail:', data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching attraction detail:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAttractionDetail();
  }, [At_id]);

  const nextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  return (
    <div>
      <Navbar />
      <div className='grid-container'>
        <div className='data'>
          <Container maxWidth="md">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <h1>{attractionDetail.At_name}</h1>
                {imageUrls.length > 0 ? (
                  <img className='im'
                    src={imageUrls[imageIndex]}
                    alt={attractionDetail.At_name}
                    style={{ width: '500px', height: '400px' }}
                  />
                ) : (
                  <p>No images available</p>
                )}
                <div className='next'>
                  {imageUrls.length > 1 && (
                    <>
                      <button onClick={prevImage} disabled={imageIndex === 0}>
                        Previous
                      </button>
                      <button onClick={nextImage} disabled={imageIndex === imageUrls.length - 1}>
                        Next
                      </button>
                    </>
                  )}
                </div>
                <p className="d">{attractionDetail.At_details}</p>
                <p className="f">{attractionDetail.At_record}</p>
                <p className="g">{attractionDetail.At_address}</p>
              </>
            )}
          </Container>
        </div>
        <div className="map">
          <MyMap1 />
        </div>
        <div className="but">
          <Link to={`/Ar/${At_id}`}>ข้อมูลเพิ่มเติมและ AR แนะนำสถานที่</Link>
        </div>
      </div>
    </div>
  );
}

export default AttractionDetail;
