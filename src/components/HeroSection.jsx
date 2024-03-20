import React from 'react'

import { useNavigate } from 'react-router-dom';
import '../App.css';
import './HeroSection.css';

function HeroSection() {
  let navigate = useNavigate();


  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>Historical attraction guide</h1>
      <p>system with AR technology</p>

    </div>
  )
}

export default HeroSection;