import React, { useState, useEffect } from 'react';
import { collection, getDocs, setDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import GameReview from './GameReview';
import GameReviewForm from './GameReviewForm';
import { Container, Row, Col, Image } from 'react-bootstrap';

function GameReviewList(props) {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsCollection = collection(firestore, 'gameReviews');
      const reviewsSnapshot = await getDocs(reviewsCollection);
      const reviewList = reviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewList);
    };

    fetchReviews();
  }, []); // runs once on mount

  function handleEdit(review) {
    setEditingReview(review);
    setShowForm(true);
  }

  async function handleDelete(id) {
    try {
      const reviewRef = doc(firestore, 'gameReviews', id);
      const reviewSnap = await getDoc(reviewRef);
      const reviewData = reviewSnap.data();

      if (props.user.uid !== reviewData.uid) {
        alert("You can only delete your own reviews.");
        return;
      }

      await deleteDoc(reviewRef);
      setReviews(reviews.filter((r) => r.id !== id));
      console.log("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review", error);
    }
  }

  async function handleSubmit(form) {
    if (!props.user) {
      alert("You must be logged in to submit a review.");
      return;
    }

    const userData = {
      displayName: props.user.displayName,
      uid: props.user.uid,
    };

    if (editingReview) {
      const reviewRef = doc(firestore, 'gameReviews', editingReview.id);
      const reviewSnap = await getDoc(reviewRef);
      const reviewData = reviewSnap.data();

      if (props.user.uid !== reviewData.uid) {
        alert("You can only edit your own reviews.");
        return;
      }

      await updateDoc(reviewRef, { ...form, ...userData });
      setReviews(reviews.map((r) => (r.id === editingReview.id ? { ...form, ...userData } : r)));
      setEditingReview(null);
    } else {
      const newReviewRef = doc(firestore, 'gameReviews', form.title);
      const docSnapshot = await getDoc(newReviewRef);

      if (docSnapshot.exists()) {
        alert("Cannot create a new game with duplicate game title");
      } else {
        await setDoc(newReviewRef, { ...form, ...userData });
        setReviews([...reviews, { ...form, ...userData, id: newReviewRef.id }]);
      }
    }
    setShowForm(false);
  }

  return (
    <Container>
      <Row className='text-end mb-3'>
        {props.user && (
              <div className="user-info mt-2">
                <span className="me-2">Logged in as <strong>{props.user.displayName}</strong></span>
                <button onClick={props.onLogout} className="btn btn-outline-light btn-sm">Log Out</button>
              </div>
            )}
      </Row>
      <Row 
        className='header-container justify-content-center align-items-center text-center flex-nowrap'
        id='game-header-container'>
        <Col>
          <Image src='images/arcade_cabinet.png' className='header-icon' alt="Arcade Cabinet" fluid />
        </Col>
        <Col>
          <h1 className='title-container' id='game-title-container'>{props.title}</h1>
        </Col>
        <Col>
          <Image src='images/arcade_cabinet.png' className='header-icon header-icon-right' alt="Arcade Cabinet" fluid />
        </Col>
      </Row>
      <Row className='toolbar my-3 justify-content-center'>
        <Col xs="auto">
          <button
            id="new-review-button"
            onClick={() => {
              if (showForm) {
                setEditingReview(null);
              }
              setShowForm(!showForm);
            }}
          >
            {showForm ? "Cancel" : "New Review"}
          </button>
        </Col>
      </Row>
      {showForm && (
        <Row className="justify-content-center">
          <Col md={8}>
            <GameReviewForm onSubmit={handleSubmit} editingReview={editingReview} />
          </Col>
        </Row>
      )}
      <Row className="mb-4 reviews d-flex flex-row">
        {reviews.map((review) => (
          <div key={review.id} className="me-3">
            <GameReview
              {...review}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </Row>
    </Container>
  );
}

export default GameReviewList;
