import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { Container, Row, Col, Image, Button, Dropdown, ButtonGroup, Alert } from 'react-bootstrap';

function ReviewList({
  title,
  user,
  onLogout,
  collectionName,
  ReviewComponent,
  ReviewFormComponent,
  reviewType,
  headerIcon = 'images/walking_book.png',
  sortOptions= ['title', 'author', 'isbn', 'ranking']
}) {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [filter, setFilter] = useState('mine');
  const [sortBy, setSortBy] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsCollection = collection(firestore, collectionName);
      const reviewsSnapshot = await getDocs(reviewsCollection);
      const reviewList = reviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewList);
    };
    fetchReviews();
  }, [collectionName]);

  useEffect(() => {
    if (!user) {
      setFilter('all');
      setSortBy('');
    }
  }, [user]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  function handleEdit(review) {
    setEditingReview(review);
    setShowForm(true);
  }

  async function handleDelete(id) {
    try {
      const reviewRef = doc(firestore, collectionName, id);
      const reviewSnap = await getDoc(reviewRef);
      const reviewData = reviewSnap.data();

      if (!user) {
        setErrorMessage("You must be logged in to delete a review.");
        return;
      }
      if (user.uid !== reviewData.uid) {
        setErrorMessage("You can only delete your own reviews.");
        return;
      }

      await deleteDoc(reviewRef);
      setReviews(reviews.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error deleting review", error);
    }
  }

  async function handleSubmit(form) {
    if (!user) {
      setErrorMessage("You must be logged in to submit a review.");
      setShowForm(false);
      setEditingReview(null);
      return;
    }

    const userData = {
      displayName: user.displayName,
      uid: user.uid,
    };

    try {
      if (editingReview) {
        const reviewRef = doc(firestore, collectionName, editingReview.id);
        const reviewSnap = await getDoc(reviewRef);
        const reviewData = reviewSnap.data();

        if (user.uid !== reviewData.uid) {
          setErrorMessage("You can only edit your own reviews.");
          return;
        }

        await updateDoc(reviewRef, { ...form, ...userData });
        setReviews(reviews.map((r) => (r.id === editingReview.id ? { ...form, ...userData, id: editingReview.id } : r)));
      } else {
        const newReviewRef = await addDoc(collection(firestore, collectionName), {
          ...form,
          ...userData,
        });
        setReviews([...reviews, { ...form, ...userData, id: newReviewRef.id }]);
      }
    } catch (error) {
      console.error("Error saving review", error);
      setErrorMessage("Something went wrong while saving your review.");
    } finally {
      setShowForm(false);
      setEditingReview(null);
    }
  }

  const filteredReviews = reviews
    .filter((r) => {
      if (filter === 'mine') return user && r.uid === user.uid;
      if (filter === 'others') return user && r.uid !== user.uid;
      return true;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;
      const valA = a[sortBy]; // dynamic property access
      const valB = b[sortBy]; // dynamic property access
      if (typeof valA === 'string') return valA.localeCompare(valB);
      if (typeof valA === 'number') return valB - valA;
      return 0;
    });

  return (
    <Container>
      <Row className='text-end mb-3'>
        {user && (
          <div className="user-info">
            <span className="mx-2" id="username">{user.displayName}</span>
            <Button variant="outline-light" onClick={onLogout}>Log Out</Button>
          </div>
        )}
      </Row>
      <Row 
        className='header-container justify-content-center align-items-center text-center flex-nowrap'
        id={`${reviewType}-header-container`}>
        <Col>
          <Image src={headerIcon} className='header-icon' alt="Header" fluid />
        </Col>
        <Col>
          <h1 className='title-container' id={`${reviewType}-title-container`}>{title}</h1>
        </Col>
        <Col>
          <Image src={headerIcon} className='header-icon header-icon-right' alt="Header" fluid />
        </Col>
      </Row>
      <Row className='toolbar my-3 justify-content-center'>
        <Col xs="auto">
          <button onClick={() => {
            if (showForm) setEditingReview(null);
            setShowForm(!showForm);
          }}>
            {showForm ? "Cancel" : "New Review"}
          </button>
        </Col>
        <Col xs="auto">
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle disabled={!user}>
              Filter: {filter === 'mine' ? 'My Reviews' : filter === 'others' ? 'Others' : 'All'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilter('all')}>All Reviews</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter('mine')}>My Reviews</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter('others')}>Others' Reviews</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs="auto">
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle>
              {sortBy ? `Sort: ${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}` : 'Sort Reviews'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {sortOptions.map(option => (
                <Dropdown.Item key={option} onClick={() => setSortBy(option)}>
                  {option.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Dropdown.Item>
              ))}
              <Dropdown.Item onClick={() => setSortBy('')}>None</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      {errorMessage && (
        <Row className='d-flex justify-content-center'>
          <Col xs="auto mb-3">
            <Alert variant="danger" className="m-0">{errorMessage}</Alert>
          </Col>
        </Row>
      )}
      {showForm && (
        <Row className="justify-content-center">
          <Col md={8}>
            <ReviewFormComponent onSubmit={handleSubmit} editingReview={editingReview} />
          </Col>
        </Row>
      )}
      <Row className="mb-4 reviews d-flex flex-row">
        {filteredReviews.map((review) => (
          <div key={review.id} className="me-3">
            <ReviewComponent {...review} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        ))}
      </Row>
    </Container>
  );
}

export default ReviewList;
