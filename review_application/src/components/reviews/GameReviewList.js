import React from 'react';
import ReviewList from './ReviewList';
import GameReview from './GameReview';
import GameReviewForm from './GameReviewForm';

export default function GameReviewList(props) {
  return (
    <ReviewList
      title={props.title}
      user={props.user}
      onLogout={props.onLogout}
      collectionName="gameReviews"
      ReviewComponent={GameReview}
      ReviewFormComponent={GameReviewForm}
      reviewType = 'game'
      headerIcon="images/arcade_cabinet.png"
      sortOptions={['title', 'developer', 'genre', 'play_time', 'release_year', 'ranking']}
    />
  );
}
