import React from 'react';
import ReviewList from './ReviewList';
import BookReview from './BookReview';
import BookReviewForm from './BookReviewForm';

export default function BookReviewList(props) {
  return (
    <ReviewList
      title={props.title}
      user={props.user}
      onLogout={props.onLogout}
      collectionName="bookReviews"
      ReviewComponent={BookReview}
      ReviewFormComponent={BookReviewForm}
      reviewType = 'book'
      headerIcon="images/walking_book.png"
      sortOptions={['title', 'author', 'isbn', 'ranking']}
    />
  );
}
