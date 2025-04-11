import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Review({
  title,
  displayName,
  ranking,
  release_year,
  review,
  onEdit,
  onDelete,
  additionalInfo = [], // Array of objects: { label, value }
  author,
  id
}) {
  const getReviewStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0;
    return "⭐".repeat(fullStars) + (halfStars ? "½" : "");
  };

  return (
    <Container className='review'>
      <Row className="mb-2">
        <Col xs={12} sm={12} md={5}>
          <h2>{title}{author ? ` - ${author}` : ''}</h2>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <p className="mb-1">Reviewed by: {displayName}</p>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Button variant="secondary" size="sm" className="me-2" onClick={() => {
              const additionalData = {};
              additionalInfo.forEach(item => {
                additionalData[item.fieldName] = item.value; // Use fieldName as key
              });
              onEdit({ 
                title, 
                displayName, 
                ranking, 
                release_year, 
                review, 
                id, 
                author, 
                ...additionalData // spread additional data
              });
            }}
              >Edit</Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(id)}>Delete</Button>
        </Col>
      </Row>

      {additionalInfo.map((item, index) => (
        <Row key={index}>
          <Col><p>{item.label}: {item.value}</p></Col>
        </Row>
      ))}

      <Row>
        <Col><p>Release Year: {Math.abs(release_year)} {release_year < 0 ? "BC" : ""}</p></Col>
      </Row>

      <Row>
        <Col>
          <p>Ranking: {getReviewStars(ranking)}</p>
        </Col>
      </Row>

      <Row>
        <Col><p>Review: {review}</p></Col>
      </Row>
    </Container>
  );
}

export default Review;
