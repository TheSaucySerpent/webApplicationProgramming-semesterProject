import React from 'react';
import Review from '../Review';

function GameReview(props) {
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
        { label: "Developer", value: props.developer, fieldName: "developer" },
        { label: "Genre", value: props.genre, fieldName: "genre" },
        { label: "Play Time", value: props.play_time, fieldName: "play_time" }
      ]}
    />
  );
}

export default GameReview;
