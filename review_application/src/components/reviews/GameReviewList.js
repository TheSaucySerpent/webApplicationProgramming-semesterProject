import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import GameReview from './GameReview';
import GameReviewForm from './GameReviewForm';
import { Container, Row, Col, Image, Button, Dropdown, ButtonGroup, Alert } from 'react-bootstrap';

function GameReviewList(props) {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [filter, setFilter] = useState('mine');
  const [sortBy, setSortBy] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsCollection = collection(firestore, 'gameReviews');
      const reviewsSnapshot = await getDocs(reviewsCollection);
      const reviewList = reviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewList);
    };

    fetchReviews();
  }, []); // runs once on mount

  useEffect(() => {
      if (!props.user) {
        setFilter('all');
        setSortBy('');
      }
    }, [props.user]); // runs whenever the user changes
  
  useEffect(() => {
    if (errorMessage) {
      // set a timer to clear the error message after 5 seconds
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);

      // cleanup the timer on component unmount or when errorMessage changes
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  function handleEdit(review) {
    setEditingReview(review);
    setShowForm(true);
  }

  async function handleDelete(id) {
    try {
      const reviewRef = doc(firestore, 'gameReviews', id);
      const reviewSnap = await getDoc(reviewRef);
      const reviewData = reviewSnap.data();

      if(!props.user) {
        setErrorMessage("You must be logged in to delete a review.");
        return;
      }
      if (props.user.uid !== reviewData.uid) {
        setErrorMessage("You can only delete your own reviews.");
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
      setErrorMessage("You must be logged in to submit a review.");
      setShowForm(false);
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
        setErrorMessage("You can only edit your own reviews.");
        setShowForm(false);
        return;
      }

      await updateDoc(reviewRef, { ...form, ...userData });
      setReviews(reviews.map((r) => (r.id === editingReview.id ? { ...form, ...userData } : r)));
      setEditingReview(null);
    } 
    else {
      try {
        const newReviewRef = await addDoc(collection(firestore, 'gameReviews'), {
          ...form,
          ...userData
        });
        setReviews([...reviews, { ...form, ...userData, id: newReviewRef.id }]);
      }
      catch (error) {
        console.error("Error adding review", error);
        setErrorMessage("Something went wrong while adding your review.");
        setShowForm(false);
      }
      // const docSnapshot = await getDoc(newReviewRef);

      // if (docSnapshot.exists()) {
      //   setErrorMessage("Cannot create a new game with duplicate game title");
      // } else {
      //   await setDoc(newReviewRef, { ...form, ...userData });
      //   setReviews([...reviews, { ...form, ...userData, id: newReviewRef.id }]);
      // }
    }
    setShowForm(false);
  }

  const filteredReviews = reviews
    .filter((r) => {
      if (filter === 'mine') return props.user && r.uid === props.user.uid;
      if (filter === 'others') return props.user && r.uid !== props.user.uid;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'title' || sortBy === 'developer' || sortBy === 'genre') {
        return a[sortBy].localeCompare(b[sortBy]);
      }
      if (sortBy === 'play_time' || sortBy === 'release_year' || sortBy === 'ranking') {
        return Number(b[sortBy]) - Number(a[sortBy]);
      }
      return 0;
    });

  return (
    <Container>
      <Row className='text-end mb-3'>
        {props.user && (
              <div className="user-info">
                <span className="mx-2" id="username">{props.user.displayName}</span>
                <Button variant="outline-light" onClick={props.onLogout}>Log Out</Button>
              </div>
        )}
      </Row>
      <Row 
        className='header-container justify-content-center align-items-center text-center flex-nowrap'
        id='game-header-container'>
        <Col>
          <Image src='images/arcade_cabinet.png' className='header-icon' alt="Arcade Cabinet" />
        </Col>
        <Col>
          <h1 className='title-container' id='game-title-container'>{props.title}</h1>
        </Col>
        <Col>
          <Image src='images/arcade_cabinet.png' className='header-icon header-icon-right' alt="Arcade Cabinet"/>
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
        <Col xs="auto">
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle id="filter-dropdown" disabled={!props.user}>
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
            <Dropdown.Toggle id="sort-dropdown">
              {sortBy ? `Sort: ${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}` : 'Sort Reviews'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSortBy('title')}>Title</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy('developer')}>Devloper</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy('genre')}>Genre</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy('play_time')}>Play Time</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy('release_year')}>Release Year</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy('ranking')}>Ranking</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy('')}>None</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row className='d-flex justify-content-center'>
        {errorMessage && (
            <Col xs="auto mb-3">
              <Alert variant="danger" className="m-0">
                {errorMessage}
              </Alert>
            </Col>
          )}
      </Row>
      {showForm && (
        <Row className="justify-content-center">
          <Col md={8}>
            <GameReviewForm onSubmit={handleSubmit} editingReview={editingReview} />
          </Col>
        </Row>
      )}
      <Row className="mb-4 reviews d-flex flex-row">
        {filteredReviews.map((review) => (
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
