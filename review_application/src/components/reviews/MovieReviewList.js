import React from 'react';
import ReviewList from '../ReviewList';
import MovieReview from './MovieReview';
import MovieReviewForm from './MovieReviewForm';

export default function MovieReviewList(props) {
  return (
    <ReviewList
      title={props.title}
      user={props.user}
      onLogout={props.onLogout}
      collectionName="movieReviews"
      ReviewComponent={MovieReview}
      ReviewFormComponent={MovieReviewForm}
      reviewType = 'movie'
      headerIcon="images/walking_tv.png"
      sortOptions={['title', 'director', 'genre', 'release_year', 'ranking']}
    />
  );
}
