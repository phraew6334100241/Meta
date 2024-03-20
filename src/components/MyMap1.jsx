import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import './attDetail.css';
function MyMap1() {
  const { At_id } = useParams();
  const [attractionDetail, setAttractionDetail] = useState({});

  useEffect(() => {
    const fetchAttractionDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3333/attractions/${At_id}`);
        const data = await response.json();

        if (data.status === 'ok') {
          setAttractionDetail(data.attraction);
        } else {
          console.error('Error fetching attraction detail:', data.message);
        }
      } catch (error) {
        console.error('Error fetching attraction detail:', error);
      }
    };

    fetchAttractionDetail();
  }, [At_id]);

  const position = [attractionDetail.latitude, attractionDetail.longitude];

  return (
    <>
      {attractionDetail.latitude && attractionDetail.longitude ? (
        <MapContainer center={position} zoom={13} style={{ height: '500px', width:'600px', position:'fixed' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <Marker position={position}>
          <Popup>
            Your Location: Latitude {position[0]}, Longitude {position[1]}
          </Popup>
        </Marker>
      </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </>
  );
}

export default MyMap1;
