import React from 'react';
import Review from '../Review';

function MovieReview(props) {
  return (
    <Review
      title={props.title}
      displayName={props.displayName}
      ranking={props.ranking}
      release_year={props.release_year}
      review={props.review}
      onEdit={props.onEdit}
      onDelete={props.onDelete}
      id={props.id}
      additionalInfo={[
        { label: "Director", value: props.director, fieldName: "director" },
        { label: "Genre", value: props.genre, fieldName: "genre" },
      ]}
    />
  );
}

export default MovieReview;
