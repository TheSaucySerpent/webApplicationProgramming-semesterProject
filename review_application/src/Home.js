// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate(); // initialize useNavigate

  const handleLoginClick = () => {
    navigate('/login'); // navigate to the /login page
  };

  return (
    <div className="home">
      <div className='home-screen-icons-container'>
        <img src='/images/walking_book.png' className='home-screen-icon' id='book-icon' alt='Walking Book'></img>
        <img src='/images/arcade_cabinet.png' className='home-screen-icon'  id='arcade-cabinet-icon'alt='Arcade Cabinet'></img>
      </div>
      <div className="home-screen-text-container">
        <h1>Welcome to allMyReviews!</h1>
        <h2>Your go-to place for logging reviews for books and games!</h2>
        <h2>Explore our collection of reviews or make an account to make your own!</h2>
      </div>
      <button onClick={handleLoginClick} className="login-button">Go to Login</button>
    </div>
  );
}

export default Home;
