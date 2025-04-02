import React, { useState, useEffect } from 'react';
import { collection, getDocs, setDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import Review from './Review';
import ReviewForm from './ReviewForm';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';

function Menu(props) {
  const [reviews, setReviews] = useState([]);
  const [showForm,  setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsCollection = collection(firestore, 'bookReviews');
      const reviewsSnapshot = await getDocs(reviewsCollection);
      const reviewList = reviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
      setReviews(reviewList);
    };
    
    fetchReviews();
  }, []); // [] ensures this runs only once when the component mounts (first added to the DOM)

  function handleEdit(review) {
    // don't want to pass entire review because review has helper functions like onEdit and onDelete
    setEditingReview({
      isbn: review.isbn,
      title: review.title,
      author: review.author,
      release_year: review.release_year,
      ranking: review.ranking,
      review: review.review
    });
    setShowForm(true);
  }

  async function handleDelete(isbn) {
    try {
      // create a reference to the document to delete
      const reviewRef = doc(firestore, 'bookReviews', isbn);
      const reviewSnap = await getDoc(reviewRef);
      const reviewData = reviewSnap.data(); 

      if (props.user.uid !== reviewData.uid) {
        alert("You can only delete your own reviews.");
        return;
      }

      await deleteDoc(reviewRef)
      setReviews(reviews.filter((r) => r.isbn !== isbn));
      console.log("Review deleted sucessfully!");
    }
    catch (error) {
      console.error("Error deleting review", error);
    }
    
  }
  
  async function handleSubmit(form) {
    // only logged in users can submit reviews (TODO add rule to firbase for this)
    if (!props.user) {
      alert("You must be logged in to submit a review.");
      return;
    }

    // get the user's information
    const userData = {
      displayName: props.user.displayName,
      uid: props.user.uid
    };

    if (editingReview) {
      // update the existing review in Firestore
      const reviewRef = doc(firestore, 'bookReviews', editingReview.isbn);
      const reviewSnap = await getDoc(reviewRef);
      const reviewData = reviewSnap.data(); 

      if (props.user.uid !== reviewData.uid) {
        alert("You can only edit your own reviews.");
        return;
      }

      await updateDoc(reviewRef, { ...form, ...userData});
      setReviews(reviews.map((r) => r.isbn === editingReview.isbn ? { ...form, ...userData } : r));
      setEditingReview(null);
    }
    else {
      // add new review to Firestore (need to ensure isbn isn't there already)
      const bookRef = doc(firestore, 'bookReviews', form.isbn);
      const docSnapshot = await getDoc(bookRef);
      
      if (docSnapshot.exists()) {
        alert("Cannot create a new book with duplicate ISBN");
      }
      else {
        const newReview = doc(firestore, 'bookReviews', form.isbn);
        await setDoc(newReview, { ...form, ...userData })
        setReviews([...reviews, { ...form, ...userData }]);
      }
    }
    setShowForm(false);
  }

  return <section>
    <div className='header-container'>
      <img src='images/walking_book.png' class='walking-book' id='walking-book-left' alt="Walking Book"></img>
      <div className='title-container'>
        <h1>{props.title}</h1>
      </div>
      <img src='images/walking_book.png' class='walking-book' id='walking-book-right' alt="Walking Book"></img>
    </div>
    <div className='toolbar'>
      <button id='logout-button' onClick={props.onLogout}>{props.user ? "Logout" : "Sign In"}</button>
      <button id='new-review-button' onClick={() => {
        if (showForm) {
          setEditingReview(null);
        }
        setShowForm(!showForm)
      }}>
        {showForm ? "Cancel" : "New Review"}
      </button>
    </div>
    {showForm ? <ReviewForm onSubmit={handleSubmit} editingReview={editingReview} /> : null}
    <div className="reviews"> {reviews.map((review) => (
      <Review key={review.isbn}
        isbn={review.isbn}
        title = {review.title}
        author={review.author}
        release_year={review.release_year}
        ranking={review.ranking}
        review={review.review}
        onEdit={handleEdit}
        onDelete={handleDelete}
        displayName={review.displayName}
      />
    ))}
    </div>
  </section>
}

export default Menu;