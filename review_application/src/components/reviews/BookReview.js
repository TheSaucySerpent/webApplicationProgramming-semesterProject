import React from 'react';
import Review from '../Review';

function BookReview(props) {
  return (
    <Review
      title={props.title}
      author={props.author}
      displayName={props.displayName}
      ranking={props.ranking}
      release_year={props.release_year}
      review={props.review}
      onEdit={props.onEdit}
      onDelete={props.onDelete}
      id={props.id}
      additionalInfo={[
        { label: "ISBN", value: props.isbn, fieldName: "isbn" }
      ]}
    />
  );
}

export default BookReview;
