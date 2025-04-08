import React from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';

function BookReview(props) {
  const getReviewStars = (rating) => {
    const fullStars = Math.floor(rating); // round down to nearest whole number
    const halfStars = rating % 1 !== 0;   // check for remainder (if so, need 1/2) 
    return "⭐".repeat(fullStars) + (halfStars ? "½" : "");
  }

  return (
    <Container className='review'>
      <Row>
        <Col>
          <h2>{props.title} - {props.author}</h2>
        </Col>
        <Col xs="auto">
          <p>Reviewed by: {props.displayName}</p>
        </Col>
        <Col xs="auto">
          <Button variant="secondary" onClick={() => props.onEdit(props)}>Edit</Button>
        </Col>
        <Col xs="auto">
          <Button variant="danger" onClick={() => props.onDelete(props.id)}>Delete</Button>
        </Col>
      </Row>
      <Row>
        <p>ISBN: {props.isbn}</p>
      </Row>
      <Row>
        <p>Ranking: {getReviewStars(props.ranking)}</p>
      </Row>
      <Row>
        <p>Release Year: {Math.abs(props.release_year)} {props.release_year < 0 ? "BC" : ""}</p>
      </Row>
      <Row>
        <p>Review: {props.review}</p>
      </Row>
    </Container>
  );
}

export default BookReview;