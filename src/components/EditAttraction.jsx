import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './EditAttraction.css';

function EditAttraction() {
  const [attractionData, setAttractionData] = useState({
    At_name: '',
    At_image: '',
    At_details: '',
    At_record: '',
    At_contact: '',
    At_record2: '',
    At_address: '',
    longitude: '',
    latitude: ''
  });

  const [ar_datadData, setAr_datadData] = useState({
  url_image1: '',
  url_image2: '',
  url_image3: '',
  url_image4: '',
  url_image5: '',
  url_image6: '',
  name1: '',
  name2: '',
  name3: '',
  name4: '',
  name5: '',
  name6: ''});


  const [ar_loData, setAr_loData] = useState({
    urll1: '',
    urll2: '',
    urll3: '',
    urll4: '',
    urll5: '',
    urll6: '',
  });

  const [ar_markData, setAr_markData] = useState({
    url1: '',
    url2: '',
    url3: '',
    url4: '',
    url5: '',
    url6: '',
  });


  const { id } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAttractionData({...attractionData, [name]: value});
    setAr_datadData({...ar_datadData, [name]: value});
    setAr_loData({...ar_loData, [name]: value});
    setAr_markData({...ar_markData, [name]: value});
  };

  const editAttractions = async () => {
    try {
      const response = await fetch(`http://localhost:3333/editAt/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...attractionData,
          ...ar_datadData,
          ...ar_loData,
          ...ar_markData
        }),
      });
  
      if (response.ok) {
        alert('Edit Attraction successfully!');
        navigate('/AdminPage/index');
      } else {
        const errorMessage = await response.text();
        throw new Error(`Failed to edit attraction: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error editing attraction:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3333/attractions/${id}`);
        const data = await response.json();

        if (data.status === 'ok') {
          setAttractionData(data.attraction);
        } else {
          console.error('Error fetching attraction:', data.message);
        }
      } catch (error) {
        console.error('Error fetching attraction:', error);
      }
    };

    const fetchDataAr = async () => {
      try {
        const response = await fetch(`http://localhost:3333/Ardatad/${id}`);
        const data = await response.json();

        if (data.status === 'ok') {
          setAr_datadData(data.attraction);
        } else {
          console.error('Error fetching attraction:', data.message);
        }
      } catch (error) {
        console.error('Error fetching attraction:', error);
      }
    };


    const fetchDataArlo = async () => {
      try {
        const response = await fetch(`http://localhost:3333/Arlocation/${id}`);
        const data = await response.json();

        if (data.status === 'ok') {
          setAr_loData(data.attraction);
        } else {
          console.error('Error fetching attraction:', data.message);
        }
      } catch (error) {
        console.error('Error fetching attraction:', error);
      }
    };

    const fetchDataArmark = async () => {
      try {
        const response = await fetch(`http://localhost:3333/Armarker/${id}`);
        const data = await response.json();

        if (data.status === 'ok') {
          setAr_markData(data.attraction);
        } else {
          console.error('Error fetching attraction:', data.message);
        }
      } catch (error) {
        console.error('Error fetching attraction:', error);
      }
    };

    fetchData();
    fetchDataAr();
    fetchDataArlo();
    fetchDataArmark();
  }, [id]);

  return (
    <div className="AddAttraction">
      <h1>Edit Attraction</h1>
      <Link className='LinkToAdmin' to ='/AdminPage/index'>Black</Link>
      <div className="information">
      <Form action="">
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
            Attraction Name:
            </label>
            <input
              type="text"
              className="form-control"
              name="At_name"
              value={attractionData.At_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="At_image">
            Image URL:
            </label>
            <input
              type="text"
              className="form-control"
              name="At_image"
              value={attractionData.At_image}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="At_image1">
            Image URL1:
            </label>
            <input
              type="text"
              className="form-control"
              name="At_image1"
              value={attractionData.At_image1}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="At_image2">
            Image URL2:
            </label>
            <input
              type="text"
              className="form-control"
              name="At_image2"
              value={attractionData.At_image2}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="At_image3">
            Image URL3:
            </label>
            <input
              type="text"
              className="form-control"
              name="At_image3"
              value={attractionData.At_image3}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="At_image4">
            Image URL4:
            </label>
            <input
              type="text"
              className="form-control"
              name="At_image4"
              value={attractionData.At_image4}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="At_details">
            Details:
            </label>
            <input
              type="text"
              className="form-control"
              name="At_details"
              value={attractionData.At_details}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="At_record">
            Record:
            </label>
            <input
              type="text"
              className="form-control"
              name="At_record"
              value={attractionData.At_record}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="At_record2">
            Record2:
            </label>
            <input
              type="text"
              className="form-control"
              name="At_record2"
              value={attractionData.At_record2}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="At_contact">
            Contact:
            </label>
            <input
              type="text"
              className="form-control"
              name="At_contact"
              value={attractionData.At_contact}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="At_address">
            Address
            </label>
            <input
              type="text"
              className="form-control"
              name="At_address"
              value={attractionData.At_address}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="latitude">
            Latitude:
            </label>
            <input
              type="text"
              className="form-control"
              name="latitude"
              value={attractionData.latitude}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="longitude">
            Longitude:
            </label>
            <input
              type="text"
              className="form-control"
              name="longitude"
              value={attractionData.longitude}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
          <label className="form-label" htmlFor="ar_image1">
          url_image1
          </label>
          <input
            type="text"
            className="form-control"
            name="url_image1"
            value={ar_datadData.url_image1}
            onChange={handleInputChange}
          />
          </div>

          <div className="mb-3">
          <label className="form-label" htmlFor="ar_image2">
          url_image2
          </label>
          <input
            type="text"
            className="form-control"
            name="url_image2"
            value={ar_datadData.url_image2}
            onChange={handleInputChange}
          />
          </div>

          <div className="mb-3">
          <label className="form-label" htmlFor="ar_image3">
          url_image3
          </label>
          <input
            type="text"
            className="form-control"
            name="url_image3"
            value={ar_datadData.url_image3}
            onChange={handleInputChange}
          />
          </div>


          <div className="mb-3">
          <label className="form-label" htmlFor="ar_image4">
          url_image4
          </label>
          <input
            type="text"
            className="form-control"
            name="url_image4"
            value={ar_datadData.url_image4}
            onChange={handleInputChange}
          />
          </div>


          <div className="mb-3">
          <label className="form-label" htmlFor="ar_image5">
          url_image5
          </label>
          <input
            type="text"
            className="form-control"
            name="url_image5"
            value={ar_datadData.url_image5}
            onChange={handleInputChange}
          />
          </div>


          <div className="mb-3">
          <label className="form-label" htmlFor="ar_image6">
          url_image6
          </label>
          <input
            type="text"
            className="form-control"
            name="url_image6"
            value={ar_datadData.url_image6}
            onChange={handleInputChange}
          />
          </div>
          
          <div className="mb-3">
          <label className="form-label" htmlFor="name1">
          name1
          </label>
          <input
            type="text"
            className="form-control"
            name="name1"
            value={ar_datadData.name1}
            onChange={handleInputChange}
          />
          </div>

          <div className="mb-3">
          <label className="form-label" htmlFor="name2">
          name2
          </label>
          <input
            type="text"
            className="form-control"
            name="name2"
            value={ar_datadData.name2}
            onChange={handleInputChange}
          />
          </div>

          <div className="mb-3">
          <label className="form-label" htmlFor="name3">
          name3
          </label>
          <input
            type="text"
            className="form-control"
            name="name3"
            value={ar_datadData.name3}
            onChange={handleInputChange}
          />
          </div>

          <div className="mb-3">
          <label className="form-label" htmlFor="name4">
          name4
          </label>
          <input
            type="text"
            className="form-control"
            name="name4"
            value={ar_datadData.name4}
            onChange={handleInputChange}
          />
          </div>

          <div className="mb-3">
          <label className="form-label" htmlFor="name5">
          name5
          </label>
          <input
            type="text"
            className="form-control"
            name="name5"
            value={ar_datadData.name5}
            onChange={handleInputChange}
          />
          </div>

          <div className="mb-3">
          <label className="form-label" htmlFor="name6">
          name6
          </label>
          <input
            type="text"
            className="form-control"
            name="name6"
            value={ar_datadData.name6}
            onChange={handleInputChange}
          />
          </div>
          
          <div className="mb-3">
          <label className="form-label" htmlFor="urll1">
            urll1
          </label>
          <input
            type="text"
            className="form-control"
            name="urll1"
            value={ar_loData.urll1}
            onChange={handleInputChange}
          />
          </div>

          <div className="mb-3">
          <label className="form-label" htmlFor="urll2">
            urll2
          </label>
          <input
            type="text"
            className="form-control"
            name="urll2"
            value={ar_loData.urll2}
            onChange={handleInputChange}
          />
          </div>
          <div className="mb-3">
          <label className="form-label" htmlFor="urll3">
            urll3
          </label>
          <input
            type="text"
            className="form-control"
            name="urll3"
            value={ar_loData.urll3}
            onChange={handleInputChange}
          />
          </div>
          <div className="mb-3">
          <label className="form-label" htmlFor="urll4">
            urll4
          </label>
          <input
            type="text"
            className="form-control"
            name="urll4"
            value={ar_loData.urll4}
            onChange={handleInputChange}
          />
          </div>

          <div className="mb-3">
          <label className="form-label" htmlFor="urll5">
            urll5
          </label>
          <input
            type="text"
            className="form-control"
            name="urll5"
            value={ar_loData.urll5}
            onChange={handleInputChange}
          />
          </div>
          <div className="mb-3">
          <label className="form-label" htmlFor="urll6">
            urll6
          </label>
          <input
            type="text"
            className="form-control"
            name="urll6"
            value={ar_loData.urll6}
            onChange={handleInputChange}
          />
          </div>

          <div className="mb-3">
          <label className="form-label" htmlFor="url1">
            url1
          </label>
          <input
            type="text"
            className="form-control"
            name="url1"
            value={ar_markData.url1}
            onChange={handleInputChange}
          />
          </div>

          <div className="mb-3">
          <label className="form-label" htmlFor="url2">
            url2
          </label>
          <input
            type="text"
            className="form-control"
            name="url2"
            value={ar_markData.url2}
            onChange={handleInputChange}
          />
          </div>
          <div className="mb-3">
          <label className="form-label" htmlFor="url3">
            url3
          </label>
          <input
            type="text"
            className="form-control"
            name="url3"
            value={ar_markData.url3}
            onChange={handleInputChange}
          />
          </div>
          <div className="mb-3">
          <label className="form-label" htmlFor="url4">
            url4
          </label>
          <input
            type="text"
            className="form-control"
            name="url4"
            value={ar_markData.url4}
            onChange={handleInputChange}
          />
          </div>

          <div className="mb-3">
          <label className="form-label" htmlFor="url5">
            url5
          </label>
          <input
            type="text"
            className="form-control"
            name="url5"
            value={ar_markData.url5}
            onChange={handleInputChange}
          />
          </div>
          <div className="mb-3">
          <label className="form-label" htmlFor="url6">
            url6
          </label>
          <input  
            type="text"
            className="form-control"
            name="url6"
            value={ar_markData.url6}
            onChange={handleInputChange}
          />
          </div>

          {/* Add other input fields for other properties */}
          <Button onClick={editAttractions} className="btn btn-success">
            Edit Attractions
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditAttraction;
