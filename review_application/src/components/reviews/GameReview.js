import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Review(props) {
  // const getReviewStars = (rating) => {
  //   const fullStars = Math.floor(rating);
  //   const halfStars = rating % 1 !== 0;
  //   return "⭐".repeat(fullStars) + (halfStars ? "½" : "");
  // };

  return (
    <Container className='review'>
      <Row className="mb-2">
        <Col>
          <h2>{props.title}</h2>
        </Col>
        <Col xs="auto">
          <p className="mb-1">Reviewed by: {props.displayName}</p>
        </Col>
        <Col xs="auto">
          <Button variant="secondary" size="sm" className="me-2" onClick={() => props.onEdit(props)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => props.onDelete(props.id)}>Delete</Button>
        </Col>
      </Row>

      <Row><Col><p>Developer: {props.developer}</p></Col></Row>
      <Row><Col><p>Genre: {props.genre}</p></Col></Row>
      <Row><Col><p>Play Time: {props.play_time} hours</p></Col></Row>
      <Row><Col><p>Release Year: {Math.abs(props.release_year)}</p></Col></Row>
      <Row><Col><p>Ranking: {props.ranking}/10</p></Col></Row>
      <Row><Col><p>Review: {props.review}</p></Col></Row>
    </Container>
  );
}

export default Review;
