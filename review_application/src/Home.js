// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';

function Home() {
  const navigate = useNavigate(); // initialize useNavigate

  const handleLoginClick = () => {
    navigate('/login'); // navigate to the /login page
  };

  return (
    <Container fluid className='vh-100 d-flex flex-column justify-content-center align-items-center'>
      <Row className='mb-4'>
        <Carousel className='custom-carousel'>
          <Carousel.Item interval={5000}>
            <img src='/images/carousel_bookshelf.jpg' alt='Carousel Bookshelf'></img>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img src='/images/carousel_arcade.jpg' alt='Carousel Gameroom'></img>
          </Carousel.Item>
        </Carousel>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center'>
          <img src='/images/walking_book.png' className='home-screen-icon' id='book-icon' alt='Walking Book' />
          <img src='/images/arcade_cabinet.png' className='home-screen-icon' id='arcade-cabinet-icon' alt='Arcade Cabinet'/>
        </Col>
      </Row>
      <Row>
        <Col className='text-center'>
          <h1>Welcome to reviewSpot!</h1>
          <h2>Your go-to place for logging reviews for books and games!</h2>
          <h2>Explore our collection of reviews or make an account to make your own!</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleLoginClick} variant='primary'>Go to Login</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Home;
