import './App.css';
import React, { useEffect } from 'react';
import { collection, getDocs, setDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from './firebaseConfig';

// const initialData = [{
//   "isbn": 9780307887443,
//   "title": "Ready Player One: A Novel",
//   "author": "Ernest Cline",
//   "release_year": 2011,
//   "ranking": 4,
//   "review": `I haven't actually read this book yet, but
//   I saw the movie and thought it was pretty good.
//   I'm asking for the book for my birthday, so hopefully I'll get to read it soon.
//   The universe of this movie is really interesting and has a lot of references to older pop culture,
//   and I can't wait to explore it and see how the references are handled in the book as opposed to the movie.`
// },
// {
//   "isbn": 9781501182099,
//   "title": "IT: A Novel",
//   "author": "Stephen King",
//   "release_year": 1986,
//   "ranking": 3.5,
//   "review": `I've never read this book, but I have seen the movie. I thought the movie was just okay,
//   definitely not my favorite horror movie but I can see why people like it. I've always been more
//   interested in horror villians with some humanity to them, or at least some flavor in their
//   motivations. Pennywise just kinda seems evil for the sake of being written that way, and for me
//   the story just wasn't captivating enough to make me interested in exploring the universe any
//   further.`
// },
// {
//   "isbn": 9780439023481,
//   "title": "The Hunger Games",
//   "author": "Suzanne Collins",
//   "release_year": 2008,
//   "ranking": 4.5,
//   "review": `I abosolutely love The Hunger Games series, it's probobly both my favorite distopian movie 
//   and book. The first book is an excellent introduction to the series, and has some really 
//   heartbreaking moments. Although it isn't necessarily my favorite in the series, it lays the
//   groundwork for the rest of the series and is a great introduction to the world of Panem and the
//   reality of the world that Katniss lives in. Suzanne Collins is an excellent writer and is so
//   good at making you feel like you're in the arena during the games, which was an action-packed and
//   terrifying experience. I also really enjoyed the slow points during this story where you get the
//   opportunity to dive a little deeper into the characters and their motivations, which is
//   especially interesting if you know where the series is going from here and how these characters
//   come to tie into each other.`
// },
// {
//   "isbn": 9798212979993,
//   "title": "Catching Fire",
//   "author": "Suzanne Collins",
//   "release_year": 2009,
//   "ranking": 5,
//   "review": `This is most people's favorite entry in the series, and I can't say I blame them. The arena
//   in this book is excellent, and the twists in this entry make for some of the very best in the series. If you've seen the movie before, reading this book is a must, as Suzanne Collin's writing
//   is at its peak here and only furthers your immersion in this distopian world. Now that The Ballad of Songbirds and Snakes is out, I honeslty can't say which book I prefer, which I know will be 
//   devisive since this book is often regarded as the best in the series. In either case, I would
//   definitely recommend this book, as I find it to be the best to re-read if exploring the series
//   again and never tire of the intricate world building and character development of this entry.`
// },
// {
//   "isbn": 9798212980005,
//   "title": "Mockingjay",
//   "author": "Suzanne Collins",
//   "release_year": 2010,
//   "ranking": 4.5,
//   "review": `I enjoyed this book, but definitely less so than Catching Fire. I think the ending of the story
//   is perfect and serves as a beautiful conclusion to the series, but I also think with this being
//   the first book to not take place in the arena it doesn't have as much action as Catching Fire.
//   With there being no Hunger Games in this entry, there's no buildup like in the other entries, such
//   as the tribute interviews, alliance making, and politics of the games. However, that clearly
//   isn't the point of this entry. By this point, Panam in an all out war with the districts and the
//   focus of the story becomes on overthrowing the capital and dealing with the rammifications of 
//   rebellion after the events of Catching Fire. It is very much the effect and final message that 
//   the series has been building to since the very first entry, and it's so amazing to witness it 
//   finally pay off. There are still just as many twists in this entry as the previous books, if 
//   not even more so due to the shocking finale. I loved this book and think Suzanne Collins did 
//   an amazing job with concluding the series in a way that felt grounded and respectful of the 
//   world she has been bulding thus far. The shift away from the games and to the war between the 
//   districts in the capital is brutal and gritty, and I love seeing the family dynamic between 
//   characters that readers have come to know and love over the course of the series. Overall, 
//   this was an excellent conclusion to the series, and I'm so glad I got to experience it.`  
// },
// {
//   "isbn": 9780316737371,
//   "title": "How to Train Your Dragon",
//   "author": "Cressida Cowell",
//   "release_year": 2003,
//   "ranking": 4,
//   "review": `I first read How to Train Your Dragon when I was a kid, and after re-reading it now I'm 
//   happy to say that the wonder of this universe never leaves you. Despite being a book aimed at 
//   children, I find that there is something so charming about this series and the world that 
//   Cressida Cowell has made. I love the style of the book, whether it's the pages being made 
//   to look like entries from Hiccup's journal or the cute little drawings that are scattered 
//   throughout the story to immerse you in the world. Reading this book makes me feel like a 
//   kid again, and brings back my sense of adventure and curiosity about the world that is so easy
//   to lose as you grow up. Although this book is made for kids, it definitely tackles some adult 
//   issues and lays the ground work for the rest of the series, where you get to witness Hiccup grow 
//   up and come into himself and his responsibilities. I absolutely adore this book and always am
//   excited to re-immerse myself into the universe that Cressida Cowell has created.`
// }
// ];

function Review(props) {
  const getReviewStars = (rating) => {
    const fullStars = Math.floor(rating); // round down to nearest whole number
    const halfStars = rating % 1 !== 0;   // check for remainder (if so, need 1/2) 
    return "⭐".repeat(fullStars) + (halfStars ? "½" : "");
  }

  return <div className="review">
    <div className="review-header">
      <h2>{props.title} - {props.author}</h2>
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
    if(!/^[a-zA-Z0-9]{4,}/.test(form.title) || form.title.length > 150) {
      alert("Title must be between 4 and 150 characters")
      return;
    }

    // validation for Author
    // must be at least 1 character at start (cannot start with a number)
    if(!/^[a-zA-Z]+/.test(form.author)) {
      alert("Author must be 1 or more characters and cannot start with a number ")
      return;
    }

    // validation for Release Year
    const currentYear = new Date().getFullYear() // get the current year
    // negative release years are assumed to be BCE, and thus it is okay to not have 4 digits
    // this is less bothersome than requiring the user to select year type from a dropdown menu
    if(form.release_year > 0 && form.release_year.length !== 4) {
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
    if(!/^[a-zA-Z]+/.test(form.review)) {
      alert("Review must be 1 or more characters and cannot start with a number")
      return;
    }

    // Ensure the numeric fields are properly formatted
    const formattedForm = {
      isbn: form.isbn, // Keep ISBN as a string
      title: form.title,
      author: form.author,
      release_year: Number(form.release_year),
      ranking: Number(form.ranking),
      review: form.review
    };

    props.onSubmit(formattedForm);
    // props.onSubmit(form);
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
  }, []); // run only once the component mounts

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
      await deleteDoc(reviewRef)
      setReviews(reviews.filter((r) => r.isbn !== isbn));
      console.log("Review deleted sucessfully!");
    }
    catch (error) {
      console.error("Error deleting review", error);
    }
    
  }
  
  async function handleSubmit(form) {
    if (editingReview) {
      // update the existing review in Firestore
      const review = doc(firestore, 'reviews', editingReview.isbn);
      await updateDoc(review, form);
      setReviews(reviews.map((r) => r.isbn === editingReview.isbn ? form : r))
      setEditingReview(null);
    }
    else {
      // add new review to Firestore
      const newReview = doc(firestore, 'reviews', form.isbn);
      await setDoc(newReview, form)
      setReviews([...reviews, form]);
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
      />
    ))}
    </div>
  </section>
}

function App() {
  return (
    <div className="App">
      <Menu title="The Bookery"/>
    </div>
  );
}

export default App;
