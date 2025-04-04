import React from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';

function Review(props) {
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
        <Col>
          <p>Reviewed by: {props.displayName}</p>
        </Col>
      </Row>
      <Row className='d-flex justify-content-end'>
        <Col xs="auto mb-3">
          <Button variant="warning" onClick={() => props.onEdit(props)}>Edit</Button>
        </Col>
        
        <Col xs="auto mb-3">
          <Button variant="danger" onClick={() => props.onDelete(props.isbn)}>Delete</Button>
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
  // return <div className="review">
  //   <div className="review-header">
  //     <h2>{props.title} - {props.author}</h2>
  //     <p>Reviewed by: {props.displayName}</p>
  //     <div className="button-container">
  //       <button id='edit-button' onClick={() => props.onEdit(props)}>Edit</button>
  //       <button id='delete-button' onClick={() => props.onDelete(props.isbn)}>Delete</button>
  //     </div>
  //   </div>

  //   <p>ISBN: {props.isbn}</p>
  //   <p>Ranking: {getReviewStars(props.ranking)}</p>
  //   <p>Release Year: {Math.abs(props.release_year)} {props.release_year < 0 ? "BC" : ""}</p>
  //   <p>Review: {props.review}</p>
  // </div>
}

export default Review;