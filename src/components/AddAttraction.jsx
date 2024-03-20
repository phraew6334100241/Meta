import './AddAttraction.css';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {useNavigate,Link } from 'react-router-dom';

function AddAttraction() {
  const [At_name, setAt_name] = useState('');
  const [At_image, setAt_image] = useState(0);
  const [At_image1, setAt_image1] = useState(0);
  const [At_image2, setAt_image2] = useState(0);
  const [At_image3, setAt_image3] = useState(0);
  const [At_image4, setAt_image4] = useState(0);
  const [At_details, setAt_details] = useState('');
  const [At_record, setAt_record] = useState('');
  const [At_contact, setAt_contact] = useState('');
  const [At_record2, setAt_record2] = useState('');
  const [At_address, setAt_address] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
//data ar
  const [url_image1, setUrl_image1] = useState(0);
  const [url_image2, setUrl_image2] = useState(0);
  const [url_image3, setUrl_image3] = useState(0);
  const [url_image4, setUrl_image4] = useState(0);
  const [url_image5, setUrl_image5] = useState(0);
  const [url_image6, setUrl_image6] = useState(0);
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [name3, setName3] = useState('');
  const [name4, setName4] = useState('');
  const [name5, setName5] = useState('');
  const [name6, setName6] = useState('');
  
  //data arlocations_url
  const [urll1, setUrll1] = useState('');
  const [urll2, setUrll2] = useState('');
  const [urll3, setUrll3] = useState('');
  const [urll4, setUrll4] = useState('');
  const [urll5, setUrll5] = useState('');
  const [urll6, setUrll6] = useState('');

  //data armarker_url
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [url3, setUrl3] = useState('');
  const [url4, setUrl4] = useState('');
  const [url5, setUrl5] = useState('');
  const [url6, setUrl6] = useState('');
  

  const [attractions, setAttractions] = useState([]);
  const navigate = useNavigate();
  const addAttractions = async () => {
    if (
        At_name.trim() === '' ||
        At_image.trim() === '' ||
        At_image1.trim() === '' ||
        At_image2.trim() === '' ||
        At_image3.trim() === '' ||
        At_image4.trim() === '' ||
        At_details.trim() === '' ||
        At_record.trim() === '' ||
        At_contact.trim() === '' ||
        At_address.trim() === '' ||
        longitude.trim() === '' ||
        latitude.trim() === '' ||

        //data ar
        url_image1.trim() === ''||
        url_image2.trim() === ''||
        url_image3.trim() === ''||
        url_image4.trim() === ''||
        url_image5.trim() === ''||
        url_image6.trim() === ''||
        name1.trim()=== ''||
        name2.trim()=== ''||
        name3.trim()=== ''||
        name4.trim()=== ''||
        name5.trim()=== ''||
        name6.trim()=== ''||

        //data arlocations_url
        urll1.trim()==''||
        urll2.trim()==''||
        urll3.trim()==''||
        urll4.trim()==''||
        urll5.trim()==''||
        urll6.trim()==''||
        //data armarker_url
        url1.trim()==''||
        url2.trim()==''||
        url3.trim()==''||
        url4.trim()==''||
        url5.trim()==''||
        url6.trim()==''



      ) {
        alert('Please fill in all fields.');
        return; // ไม่ทำการบันทึกหากข้อมูลว่างหรือ null
      }

    try {
      const response = await fetch('http://localhost:3333/Atadd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            At_name,
            At_image,
            At_image1,
            At_image2,
            At_image3,
            At_image4,
            At_details,
            At_record,
            At_contact,
            At_record2,
            At_address,
            longitude,
            latitude,
            url_image1,url_image2,url_image3,url_image4,url_image5,url_image6,name1,name2,name3,name4,name5,name6,
            urll1,urll2,urll3,urll4,urll5,urll6,url1,url2,url3,url4,url5,url6
        }),
      });

      if (response.ok) {
        const addedAttraction = {
            At_name,
            At_image,
            At_image1,
            At_image2,
            At_image3,
            At_image4,
            At_details,
            At_record,
            At_contact,
            At_record2,
            At_address,
            longitude,
            latitude,
            url_image1,url_image2,url_image3,url_image4,url_image5,url_image6,name1,name2,name3,name4,name5,name6,
            urll1,urll2,urll3,urll4,urll5,urll6,url1,url2,url3,url4,url5,url6
        };

        setAttractions([...attractions, addedAttraction]);
        alert('Attraction added successfully!');
        navigate('/AdminPage/index');
      } else {
        throw new Error('Failed to add attraction');
      }
    } catch (error) {
      console.error('Error adding attraction:', error);
    }
  };


  return (
    <div className="AddAttraction">
      <h1 className='head'>Add Attraction</h1>
      <Link className = 'LinkToAdmin'to ='/AdminPage/index'>Black</Link>
      <div className="information">
        <Form action="">
          <>
          <div className='info'>
          <div className="mb-3">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              onChange={(event) => {
                setAt_name(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label >image url:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter image url"
              onChange={(event) => {
                setAt_image(event.target.value)
              }}
            />
          </div>

          <div className="mb-3">
            <label >image url1:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter image url1"
              onChange={(event) => {
                setAt_image1(event.target.value)
              }}
            />
          </div>

          <div className="mb-3">
            <label >image url2:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter image url2"
              onChange={(event) => {
                setAt_image2(event.target.value)
              }}
            />
          </div>

          <div className="mb-3">
            <label >image url3:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter image url3"
              onChange={(event) => {
                setAt_image3(event.target.value)
              }}
            />
          </div>

          <div className="mb-3">
            <label >image url4:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter image url4"
              onChange={(event) => {
                setAt_image4(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="country">Details:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Details"
              onChange={(event) => {
                setAt_details(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label >Record:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Record"
              onChange={(event) => {
                setAt_record(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label>Record2:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter record2"
              onChange={(event) => {
                setAt_record2(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label >Contact:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Contact"
              onChange={(event) => {
                setAt_contact(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label>Address:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter address"
              onChange={(event) => {
                setAt_address(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label>Longitude:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Longitude"
              onChange={(event) => {
                setLongitude(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label>Latitude:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Latitude"
              onChange={(event) => {
                setLatitude(event.target.value)
              }}
            />
          </div>
          </div>
          </>
          <>
          <div className='imageAt'>      
          <div className="mb-3">
            <label>url_image1:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter url_image1"
              onChange={(event) => {
                setUrl_image1(event.target.value)
              }}
            />
          </div>

          <div className="mb-3">
            <label>url_image2:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter url_image2"
              onChange={(event) => {
                setUrl_image2(event.target.value)
              }}
            />
          </div>

          <div className="mb-3">
            <label>url_image3:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter url_image3"
              onChange={(event) => {
                setUrl_image3(event.target.value)
              }}
            />
          </div>

          <div className="mb-3">
            <label>url_image4:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter url_image4"
              onChange={(event) => {
                setUrl_image4(event.target.value)
              }}
            />
          </div>

          <div className="mb-3">
            <label>url_image5:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter url_image5"
              onChange={(event) => {
                setUrl_image5(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label>url_image6:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter url_image6"
              onChange={(event) => {
                setUrl_image6(event.target.value)
              }}
            />
          </div>
          </div>
          <div className='NameAt'>
          <div className="mb-3">
            <label>name1:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name1"
              onChange={(event) => {
                setName1(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label>name2:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name2"
              onChange={(event) => {
                setName2(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label>name3:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name3"
              onChange={(event) => {
                setName3(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label>name4:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name4"
              onChange={(event) => {
                setName4(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label>name5:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name1"
              onChange={(event) => {
                setName5(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label>name6:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name1"
              onChange={(event) => {
                setName6(event.target.value)
              }}
            />
          </div>
          </div>
          </>
          <>
          <div className='Ar-location'>
          <div className="mb-3">
            <label>url1:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter urll1"
              onChange={(event) => {
                setUrll1(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label>url2:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter urll2"
              onChange={(event) => {
                setUrll2(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label>url3:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter urll3"
              onChange={(event) => {
                setUrll3(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label>url4:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter urll4"
              onChange={(event) => {
                setUrll4(event.target.value)
              }}
            />
          </div>

          <div className="mb-3">
            <label>url5:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter urll5"
              onChange={(event) => {
                setUrll5(event.target.value)
              }}
            />
          </div>

          <div className="mb-3">
            <label>url6:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter urll6"
              onChange={(event) => {
                setUrll6(event.target.value)
              }}
            />
          </div>
          </div>
          <div className='Ar-marker'>
          <div className="mb-3">
            <label>url1:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter url1"
              onChange={(event) => {
                setUrl1(event.target.value)
              }}
            />
          </div>

          <div className="mb-3">
            <label>url2:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter url2"
              onChange={(event) => {
                setUrl2(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label>url3:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter url3"
              onChange={(event) => {
                setUrl3(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label>url4:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter url4"
              onChange={(event) => {
                setUrl4(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label>url5:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter url5"
              onChange={(event) => {
                setUrl5(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label>url6:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter url6"
              onChange={(event) => {
                setUrl6(event.target.value)
              }}
            />
          </div>
          </div>
          </>
          <br/>
          <Button onClick={addAttractions} class="btn btn-success">
            Add Attractions
          </Button>
        </Form>
      </div>
      </div>
  );
} 

export default AddAttraction;
