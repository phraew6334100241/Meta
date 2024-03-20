import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { TextField, CircularProgress, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProfile.css';

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ name: '', phone: '', Lifestyle: '', birthday: '', imageFile: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3333/user/${id}`);
        const data = await response.json();

        if (data.status === 'ok') {
          setUserData(data.user[0]);
          setImagePreview(`http://localhost:3333/images/${data.user[0].imageFile}`);
        } else {
          setError(`Error fetching user data: ${data.message}`);
        }
      } catch (error) {
        setError(`Error fetching user data: ${error.message}`);
      }
    };

    fetchUserData();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      if (!userData.name || !userData.phone || !userData.birthday || !userData.Lifestyle || !userData.imageFile) {
        setError('Name, phone, birthday, Lifestyle, and image are required');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('birthday', userData.birthday);
      formData.append('Lifestyle', userData.Lifestyle);
      formData.append('imageFile', userData.imageFile);

      const response = await fetch(`http://localhost:3333/editProfile/${id}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();

      if (data.status === 'ok') {
        alert('Profile updated successfully');
        navigate(`/MemberPage/index/${id}`);
      } else {
        setError(`Error updating profile: ${data.message}`);
      }
    } catch (error) {
      setError(`Error updating profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'imageFile') {
      if (files && files.length > 0) {
        const file = e.target.files[0];
        setUserData((prevUserData) => ({ ...prevUserData, imageFile: file }));
        setImagePreview(URL.createObjectURL(file));
      }
    } else {
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <Navbar />
      <div className="center-container">
        <div className="form-container">
          <h1>Edit Member Profile</h1>
          <form onSubmit={handleEdit} className="edit-form">
            <div className="image-upload">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="image"
                />
              )}
              <input type="file" accept="image/*" name="imageFile" className ="btuselect" onChange={handleInputChange} />
            </div>

            <TextField  
              autoComplete="off"
              name="name"
              label="Name"
              required
              value={userData.name}
              onChange={handleInputChange}
              className="text-field"
            />
            <TextField
              autoComplete="off"
              name="phone"
              label="Phone"
              required
              value={userData.phone}
              onChange={handleInputChange}
              className="text-field"
            />
            <TextField
              autoComplete="off"
              type="date"
              name="birthday"
              label="Birthday"
              required
              value={userData.birthday}
              onChange={handleInputChange}
              className="text-field"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              autoComplete="off"
              name="Lifestyle"
              label="Lifestyle"
              required
              value={userData.Lifestyle}
              onChange={handleInputChange}
              className="text-field"
            />
            {error && <div className="error-message">{error}</div>}
            <Button type="submit" variant="contained" disabled={loading} className="submit-button">
              {loading ? <CircularProgress size={24} /> : 'Edit Member'}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
