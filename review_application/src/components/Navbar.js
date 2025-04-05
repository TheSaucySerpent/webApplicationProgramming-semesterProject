// src/Navbar.js
import React from 'react';
import { Nav, Container } from 'react-bootstrap';
import { Link , useLocation} from 'react-router-dom';

function Navbar() {
  // get the current route (needed for live updating tabs)
  const location = useLocation();

  return (
    <Container className="d-flex justify-content-center mb-3">
      <Nav 
        variant="tabs" 
        defaultActiveKey="/" 
        activeKey={location.pathname} 
        className="flex-wrap justify-content-center custom-navbar">
      <Nav.Item>
        <Nav.Link as={Link} to="/"  eventKey="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/login" eventKey="/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/book-reviews" eventKey="/book-reviews">Book Reviews</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/game-reviews" eventKey="/game-reviews">Game Reviews</Nav.Link>
      </Nav.Item>
      </Nav>
    </Container>
  );
}

export default Navbar;
