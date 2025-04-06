import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

function GameReviewForm(props) {
  const [form, setForm] = useState({
    title: "",
    developer: "",
    genre: "",
    play_time: "",
    release_year: "",
    ranking: "",
    review: ""
  });

  useEffect(() => {
    if (props.editingReview) {
      setForm(props.editingReview);
    }
  }, [props.editingReview]);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validation: title
    if (form.title.length > 150) {
      alert("Title must be less than 150 characters.");
      return;
    }

    // Validation: developer
    if (!/^[a-zA-Z][a-zA-Z0-9 .,-]*$/.test(form.developer)) {
      alert("Developer must start with a letter and can include letters, numbers, spaces, periods, hyphens, and commas.");
      return;
    }    

    // Validation: genre
    if (!/^[a-zA-Z][a-zA-Z0-9 .,-]*$/.test(form.genre)) {
      alert("Genre must start with a letter and can include letters, numbers, spaces, periods, hyphens, and commas.");
      return;
    }   

    // Validation: play time (must be a number >= 0)
    if (isNaN(form.play_time) || Number(form.play_time) < 0) {
      alert("Play time must be a non-negative number.");
      return;
    }

    // Validation: release year
    const currentYear = new Date().getFullYear();
    if (form.release_year > 0 && !/^\d{4}$/.test(form.release_year)) {
      alert("Release year must be exactly 4 digits.");
      return;
    }
    if (form.release_year > currentYear) {
      alert("Release year cannot be in the future.");
      return;
    }

    // Validation: review
    if (form.review.length > 5000) {
      alert("Review must be less than 5000 characters.");
      return;
    }

    const formattedForm = {
      title: form.title,
      developer: form.developer,
      genre: form.genre,
      play_time: Number(form.play_time),
      release_year: Number(form.release_year),
      ranking: Number(form.ranking),
      review: form.review
    };

    props.onSubmit(formattedForm);

    setForm({
      title: "",
      developer: "",
      genre: "",
      play_time: "",
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
            <Form.Group controlId="formDeveloper">
              <Form.Label>Developer</Form.Label>
              <Form.Control type="text" name="developer" value={form.developer} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center mb-4">
          <Col md={6}>
            <Form.Group controlId="formGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control type="text" name="genre" value={form.genre} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPlayTime">
              <Form.Label>Play Time (hrs)</Form.Label>
              <Form.Control type="number" name="play_time" value={form.play_time} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center mb-4">
          <Col md={6}>
            <Form.Group controlId="formReleaseYear">
              <Form.Label>Release Year</Form.Label>
              <Form.Control type="number" name="release_year" value={form.release_year} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formRanking">
              <Form.Label>Ranking</Form.Label>
              <Form.Control type="number" name="ranking" value={form.ranking} onChange={handleChange} min="0" max="10" step="0.5" required />
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

export default GameReviewForm;
