import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Carousel } from 'react-bootstrap';

function Home() {
  const navigate = useNavigate(); // initialize useNavigate

  const handleLoginClick = () => {
    navigate('/login'); // navigate to the /login page
  };

  return (
    <Container fluid className='d-flex flex-column justify-content-center align-items-center'>
      <Row className='mb-4'>
      <Carousel className="custom-carousel">
        {Array.from({ length: 9 }, (_, index) => (
          <Carousel.Item key={index} interval={5000}>
            <img
              src={`/images/carousel/carousel${index + 1}.jpg`}
              alt={`Carousel ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center'>
          <img src='/images/walking_book.png' className='home-screen-icon' id='book-icon' alt='Walking Book' />
          <img src='/images/arcade_cabinet.png' className='home-screen-icon' id='arcade-cabinet-icon' alt='Arcade Cabinet'/>
          <img src='/images/walking_tv.png' className='home-screen-icon' id='movie-icon' alt='Walking Tv' />
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
          <button onClick={handleLoginClick}>Go to Login</button>
        </Col>
      </Row>
    </Container>
  )
}

export default Home;
