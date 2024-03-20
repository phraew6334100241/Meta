import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Navbar from './components/Navbar';
import Attraction from './components/attraction';
import AttractionDetail from './components/AttractionDetail';
import AdminPage from './components/AdminPage';
import MemberPage from './components/memberPage';
import MyMap1 from './components/MyMap1';
import Ar from './components/Ar';
import ReviewAt from './components/ReviewAt'
import EditProfile from './components/EditProfile';
import AddAttraction from './components/AddAttraction';
import EditAttraction from './components/EditAttraction';
import ImageComponent from './components/test';
import Delete from './components/Delete';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="Attraction/login" element={<Login />} />
        <Route path="Attraction/:id/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="Navbar" element={<Navbar />} />
        <Route path="memberPage/Attraction" element={<Attraction />} />
        <Route path="Attraction" element={<Attraction />} />
        <Route path="AdminPage/index" element={<AdminPage />} />
        <Route path="MemberPage/index/:id" element={<MemberPage />} />
        <Route path="Attraction/:At_id" element={<AttractionDetail />} />
        <Route path="MyMap1" element={<MyMap1 />} />
        <Route path="Ar/:At_id" element={<Ar />} />
        <Route path="ReviewAt/:At_id" element={<ReviewAt />} />
        <Route path="EditProfile/:id" element={<EditProfile />} />
        <Route path="AddAtt" element={<AddAttraction />} />
        <Route path="/EditAttraction/:id" element={<EditAttraction />} />
        <Route path="ImageComponent" element={<ImageComponent />} />
        <Route path="Delete" element={<Delete />} />
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
