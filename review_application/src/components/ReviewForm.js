import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

function ReviewForm(props) {
  const [form, setForm] = useState({
    isbn: "",
    title: "",
    author: "",
    release_year: "",
    ranking: "",
    review: ""
  });

  // needed to use this to prevent infinite re-renders when editing a review
  useEffect(() => {
    if(props.editingReview) {
      setForm(props.editingReview);
    }
  }, [props.editingReview]);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault(); // prevent default form submission behavior

    // validation for ISBN (must be a 10 or 13 digit number, X allowed for checksum position)
    if (!/^\d{9}[\dXx]$|^\d{13}$/.test(form.isbn)) {
      alert("ISBN must be a 10 or 13 digit number, with 'X' allowed as the last character for 10-digit ISBNs");
      return;
    }
    
    // validation for Title
    // must be less than 150 characters (already ensured to not be empty since field is required)
    if(form.title.length > 150) {
      alert("Title must be less than 150 characters")
      return;
    }

    // validation for Author
    // must start with a letter and can include letters, numbers, spaces, periods, and hyphens
    if (!/^[a-zA-Z][a-zA-Z0-9 .-]*$/.test(form.author)) {
      alert("Author must start with a letter and can include letters, numbers, spaces, periods, and hyphens.");
      return;
    }

    // validation for Release Year
    const currentYear = new Date().getFullYear() // get the current year
    // negative release years are assumed to be BCE, and thus it is okay to not have 4 digits
    // this is less bothersome than requiring the user to select year type from a dropdown menu
    if(form.release_year > 0 && !/^\d{4}$/.test(form.release_year)) {
      alert("Release year must be exactly 4 digits. Negative values denote BCE release years")
      return;
    }
    // must be a year that has happened (BCE releases years will not trigger this because they are negative)
    if(form.release_year > currentYear) {
      alert("Release year cannot be year in the future")
      return;
    }

    // ranking does not need validaiton here, as it is done through 
    // the use of min/max for the number input type (ensures half increments between 0 and 5)

    // validation for Review (may in the future want to allow users not to leave review)
    // must be less than 5000 characters (already ensured to not be empty since field is required)
    // this is the length that LetterBoxd uses with no other restrictions
    if(form.review.length > 5000) {
      alert("Review must be less than 5000 characters");
      return;
    }

    // ensure the numeric fields are properly formatted
    const formattedForm = {
      isbn: form.isbn, // Keep ISBN as a string (can have X in checksun)
      title: form.title,
      author: form.author,
      release_year: Number(form.release_year),
      ranking: Number(form.ranking),
      review: form.review
    };
    props.onSubmit(formattedForm);
    
    setForm({ // reset the form fields after submission
      isbn: "",
      title: "",
      author: "",
      release_year: "",
      ranking: "",
      review: ""
    });
  }

  return (
    <Container fluid className="d-flex justify-content-center p-4 review-form">
      <Form onSubmit={handleSubmit} className='w-75'>
        <Row className="d-flex justify-content-center mb-4">
          <Col md={6}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={form.title} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" name="author" value={form.author} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mb-1">
        <Col xs={12} md={4}>
            <Form.Group controlId="formISBN">
              <Form.Label>ISBN</Form.Label>
              <Form.Control type="text" name="isbn" value={form.isbn} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col xs={6} md={4}>
            <Form.Group controlId="formReleaseYear">
              <Form.Label>Release Year</Form.Label>
              <Form.Control type="number" name="release_year" value={form.release_year} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col xs={6} md={4}>
            <Form.Group controlId="formRanking" className="mb-3">
              <Form.Label>Ranking</Form.Label>
              <Form.Control type="number" name="ranking" value={form.ranking} onChange={handleChange} min="0" max="5" step="0.5" required />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="formReview" className="mb-3">
          <Form.Label>Review</Form.Label>
          <Form.Control as="textarea" rows={10} name="review" value={form.review} onChange={handleChange} required />
        </Form.Group>
        <div className="text-center">
          <button type="submit">Submit</button>
        </div>
      </Form>
    </Container>
  );
}

export default ReviewForm;