import './App.css';
import React, { useEffect } from 'react';
import { collection, getDocs, setDoc, updateDoc, deleteDoc, doc, getDoc} from 'firebase/firestore';
import { authentication, firestore } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './Login';

function Review(props) {
  const getReviewStars = (rating) => {
    const fullStars = Math.floor(rating); // round down to nearest whole number
    const halfStars = rating % 1 !== 0;   // check for remainder (if so, need 1/2) 
    return "⭐".repeat(fullStars) + (halfStars ? "½" : "");
  }

  return <div className="review">
    <div className="review-header">
      <h2>{props.title} - {props.author}</h2>
      <p>Reviewed by: {props.displayName}</p>
      <div className="button-container">
        <button id='edit-button' onClick={() => props.onEdit(props)}>Edit</button>
        <button id='delete-button' onClick={() => props.onDelete(props.isbn)}>Delete</button>
      </div>
    </div>

    <p>ISBN: {props.isbn}</p>
    <p>Ranking: {getReviewStars(props.ranking)}</p>
    <p>Release Year: {Math.abs(props.release_year)} {props.release_year < 0 ? "BC" : ""}</p>
    <p>Review: {props.review}</p>
  </div>
}

function ReviewForm(props) {
  const [form, setForm] = React.useState({
    isbn: "",
    title: "",
    author: "",
    release_year: "",
    ranking: "",
    review: ""
  });

  // needed to use this to prevent infinite re-renders when editing a review
  React.useEffect(() => {
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
    <div className='review-form-container'>
      <form onSubmit={handleSubmit} className="review-form">
        <div className='form-field'>
          <label>ISBN:</label>
          <input type="text" name="isbn" value={form.isbn} onChange={handleChange} required />
        </div>
        <div className='form-field'>
          <label>Title:</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className='form-field'>
          <label>Author:</label>
          <input type="text" name="author" value={form.author} onChange={handleChange} required />
        </div>
        <div className='form-field'>
          <label>Release Year:</label>
          <input type="number" name="release_year" value={form.release_year} onChange={handleChange} required />
        </div>
        <div className='form-field'>
          <label>Ranking:</label>
          <input type="number" name="ranking" value={form.ranking} onChange={handleChange} min="0" max="5" step="0.5" required />
        </div>
        <div className='form-field'>
          <label>Review:</label>
          <textarea name="review" value={form.review} onChange={handleChange} required />
        </div>
        <button type="submit" id='submit-button'>Submit</button>
        </form>
    </div>
  );  
}

function Menu(props) {
  const [reviews, setReviews] = React.useState([]);
  const [showForm,  setShowForm] = React.useState(false);
  const [editingReview, setEditingReview] = React.useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsCollection = collection(firestore, 'reviews');
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
      const reviewRef = doc(firestore, 'reviews', isbn);
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
      const reviewRef = doc(firestore, 'reviews', editingReview.isbn);
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
      const bookRef = doc(firestore, 'reviews', form.isbn);
      const docSnapshot = await getDoc(bookRef);
      
      if (docSnapshot.exists()) {
        alert("Cannot create a new book with duplicate ISBN");
      }
      else {
        const newReview = doc(firestore, 'reviews', form.isbn);
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(authentication, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
        setUser(currentUser); // set user to the currently authenticated user
      } else {
        setIsLoggedIn(false);
        setUser(null); // reset user state when not logged in
      }
    });

    return () => unsubscribe(); // cleanup subscription on unmount
  }, []);

  async function handleLogout() {
    await signOut(authentication);
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="App">
      {isLoggedIn ? <Menu title="The Bookery" user={user} onLogout={handleLogout}/> : <Login onLogin={() => setIsLoggedIn(true)} />}
    </div>
  );
}

export default App;
