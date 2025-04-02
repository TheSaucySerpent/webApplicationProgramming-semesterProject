// src/Home.js
import React from 'react';

function Home() {
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
    </div>
  );
}

export default Home;
