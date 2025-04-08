import React from 'react';
import Review from './Review';

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
        { label: "Developer", value: props.developer },
        { label: "Genre", value: props.genre },
        { label: "Play Time", value: `${props.play_time} hours` }
      ]}
    />
  );
}

export default GameReview;
