import './App.css';
import React from 'react';

const initialData = [{
  "isbn": 9780307887443,
  "title": "Ready Player One: A Novel",
  "author": "Ernest Cline",
  "release_year": 2011,
  "ranking": 4,
  "review": `I haven't actually read this book yet, but
  I saw the movie and thought it was pretty good.
  I'm asking for the book for my birthday, so hopefully I'll get to read it soon.
  The universe of this movie is really interesting and has a lot of references to older pop culture,
  and I can't wait to explore it and see how the references are handled in the book as opposed to the movie.`
},
{
  "isbn": 9781501182099,
  "title": "IT: A Novel",
  "author": "Stephen King",
  "release_year": 1986,
  "ranking": 3.5,
  "review": `I've never read this book, but I have seen the movie. I thought the movie was just okay,
  definitely not my favorite horror movie but I can see why people like it. I've always been more
  interested in horror villians with some humanity to them, or at least some flavor in their
  motivations. Pennywise just kinda seems evil for the sake of being written that way, and for me
  the story just wasn't captivating enough to make me interested in exploring the universe any
  further.`
},
{
  "isbn": 9780439023481,
  "title": "The Hunger Games",
  "author": "Suzanne Collins",
  "release_year": 2008,
  "ranking": 4.5,
  "review": `I abosolutely love The Hunger Games series, it's probobly both my favorite distopian movie 
  and book. The first book is an excellent introduction to the series, and has some really 
  heartbreaking moments. Although it isn't necessarily my favorite in the series, it lays the
  groundwork for the rest of the series and is a great introduction to the world of Panem and the
  reality of the world that Katniss lives in. Suzanne Collins is an excellent writer and is so
  good at making you feel like you're in the arena during the games, which was an action-packed and
  terrifying experience. I also really enjoyed the slow points during this story where you get the
  opportunity to dive a little deeper into the characters and their motivations, which is
  especially interesting if you know where the series is going from here and how these characters
  come to tie into each other.`
},
{
  "isbn": 9798212979993,
  "title": "Catching Fire",
  "author": "Suzanne Collins",
  "release_year": 2009,
  "ranking": 5,
  "review": `This is most people's favorite entry in the series, and I can't say I blame them. The arena
  in this book is excellent, and the twists in this entry make for some of the very best in the series. If you've seen the movie before, reading this book is a must, as Suzanne Collin's writing
  is at its peak here and only furthers your immersion in this distopian world. Now that The Ballad of Songbirds and Snakes is out, I honeslty can't say which book I prefer, which I know will be 
  devisive since this book is often regarded as the best in the series. In either case, I would
  definitely recommend this book, as I find it to be the best to re-read if exploring the series
  again and never tire of the intricate world building and character development of this entry.`
},
{
  "isbn": 9798212980005,
  "title": "Mockingjay",
  "author": "Suzanne Collins",
  "release_year": 2010,
  "ranking": 4.5,
  "review": `I enjoyed this book, but definitely less so than Catching Fire. I think the ending of the story
  is perfect and serves as a beautiful conclusion to the series, but I also think with this being
  the first book to not take place in the arena it doesn't have as much action as Catching Fire.
  With there being no Hunger Games in this entry, there's no buildup like in the other entries, such
  as the tribute interviews, alliance making, and politics of the games. However, that clearly
  isn't the point of this entry. By this point, Panam in an all out war with the districts and the
  focus of the story becomes on overthrowing the capital and dealing with the rammifications of 
  rebellion after the events of Catching Fire. It is very much the effect and final message that 
  the series has been building to since the very first entry, and it's so amazing to witness it 
  finally pay off. There are still just as many twists in this entry as the previous books, if 
  not even more so due to the shocking finale. I loved this book and think Suzanne Collins did 
  an amazing job with concluding the series in a way that felt grounded and respectful of the 
  world she has been bulding thus far. The shift away from the games and to the war between the 
  districts in the capital is brutal and gritty, and I love seeing the family dynamic between 
  characters that readers have come to know and love over the course of the series. Overall, 
  this was an excellent conclusion to the series, and I'm so glad I got to experience it.`  
},
{
  "isbn": 9780316737371,
  "title": "How to Train Your Dragon",
  "author": "Cressida Cowell",
  "release_year": 2003,
  "ranking": 4,
  "review": `I first read How to Train Your Dragon when I was a kid, and after re-reading it now I'm 
  happy to say that the wonder of this universe never leaves you. Despite being a book aimed at 
  children, I find that there is something so charming about this series and the world that 
  Cressida Cowell has made. I love the style of the book, whether it's the pages being made 
  to look like entries from Hiccup's journal or the cute little drawings that are scattered 
  throughout the story to immerse you in the world. Reading this book makes me feel like a 
  kid again, and brings back my sense of adventure and curiosity about the world that is so easy
  to lose as you grow up. Although this book is made for kids, it definitely tackles some adult 
  issues and lays the ground work for the rest of the series, where you get to witness Hiccup grow 
  up and come into himself and his responsibilities. I absolutely adore this book and always am
  excited to re-immerse myself into the universe that Cressida Cowell has created.`
}
];

function Review(props) {
  const getReviewStars = (rating) => {
    const fullStars = Math.floor(rating); // round down to nearest whole number
    const halfStars = rating % 1 !== 0;   // check for remainder (if so, need 1/2) 
    return "★".repeat(fullStars) + (halfStars ? "½" : "");
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
    <p>Release Year: {props.release_year}</p>
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
    props.onSubmit(form);
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
    <form onSubmit={handleSubmit} className="review-form">
      <div>
        <label>ISBN:</label>
        <input type="text" name="isbn" value={form.isbn} onChange={handleChange} required />
      </div>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={form.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Author:</label>
        <input type="text" name="author" value={form.author} onChange={handleChange} required />
      </div>
      <div>
        <label>Release Year:</label>
        <input type="number" name="release_year" value={form.release_year} onChange={handleChange} required />
      </div>
      <div>
        <label>Ranking (0-5):</label>
        <input type="number" name="ranking" value={form.ranking} onChange={handleChange} min="0" max="5" step="0.5" required />
      </div>
      <div>
        <label>Review:</label>
        <textarea name="review" value={form.review} onChange={handleChange} required />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );  
}

function Menu(props) {
  const [reviews, setReviews] = React.useState(initialData);
  const [showForm,  setShowForm] = React.useState(false);
  const [editingReview, setEditingReview] = React.useState(null);

  function handleEdit(review) {
    setEditingReview(review);
    setShowForm(true);
  }

  function handleDelete(isbn) {
    setReviews(reviews.filter((r) => r.isbn !== isbn));
  }
  
  function handleFormSubmit(form) {
    if (editingReview) {
      setReviews(reviews.map((r) => r.isbn === editingReview.isbn ? form : r))
      setEditingReview(null);
    }
    else {
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
      <button id='new-review-button' onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "New Review"}
      </button>
    </div>
    {showForm ? <ReviewForm onSubmit={handleFormSubmit} editingReview={editingReview} /> : null}
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
      <Menu title="Book Reviews" reviews={initialData} />
    </div>
  );
}

export default App;
