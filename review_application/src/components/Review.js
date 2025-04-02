import React from 'react';

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

export default Review;