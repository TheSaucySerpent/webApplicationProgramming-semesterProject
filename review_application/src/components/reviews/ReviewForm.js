import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

function ReviewForm({ fields, onSubmit, editingReview }) {
  const [form, setForm] = useState(() =>
    Object.fromEntries(fields.map(field => [field.name, ""]))
  );

  useEffect(() => {
    if (editingReview) {
      setForm(editingReview);
    }
  }, [editingReview]);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    for (const field of fields) {
      const value = form[field.name];

      if (field.required && !value) {
        alert(`${field.label} is required.`);
        return;
      }

      if (field.validate && !field.validate(value)) {
        alert(field.errorMessage || `Invalid value for ${field.label}`);
        return;
      }
    }

    const formatted = Object.fromEntries(
      fields.map(field => [
        field.name,
        field.type === "number" ? Number(form[field.name]) : form[field.name]
      ])
    );

    onSubmit(formatted);

    // Clear form after submission
    setForm(Object.fromEntries(fields.map(field => [field.name, ""])));
  }

  return (
    <Container fluid className="d-flex justify-content-center p-4 review-form">
      <Form onSubmit={handleSubmit} className='w-75'>
        <Row className="d-flex justify-content-center mb-4">
          {fields.map((field, index) => (
            <Col md={field.fullRow ? 12 : 6} key={index} className="mb-3">
              <Form.Group controlId={`form${field.name}`}>
                <Form.Label>{field.label}</Form.Label>
                {field.as === "textarea" ? (
                  <Form.Control
                    as="textarea"
                    rows={field.rows || 4}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    required={field.required}
                  />
                ) : (
                  <Form.Control
                    type={field.type || "text"}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                  />
                )}
              </Form.Group>
            </Col>
          ))}
        </Row>
        <div className="text-center">
          <button type="submit">Submit</button>
        </div>
      </Form>
    </Container>
  );
}

export default ReviewForm;
