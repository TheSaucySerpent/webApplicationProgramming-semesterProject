import ReviewForm from '../ReviewForm';

const movieFields = [
  {
    name: "title",
    label: "Title",
    required: true,
    validate: val => val.length <= 150,
    errorMessage: "Title must be less than 150 characters"
  },
  {
    name: "director",
    label: "Director",
    required: true,
    validate: val => /^[a-zA-Z][a-zA-Z0-9 .,-]*$/.test(val) && val.length <= 150,
    errorMessage: "Director must be less than 150 characters and must start with a letter"
  },
  {
    name: "genre",
    label: "Genre",
    required: true,
    validate: val => /^[a-zA-Z0-9][a-zA-Z0-9 .,-]*$/.test(val) && val.length <= 150,
    errorMessage: "Genre must be less than 150 characters and can start with a letter or number"
  },
  {
    name: "release_year",
    label: "Release Year",
    type: "number",
    required: true,
    validate: val => {
      const year = Number(val);
      return (/^\d{4}$/.test(val)) && year <= new Date().getFullYear();
    },
    errorMessage: "Release year must be 4 digits, positive, and cannot be greater than the current year"
  },
  {
    name: "ranking",
    label: "Ranking",
    type: "number",
    required: true,
    min: 0,
    max: 5,
    step: 0.5,
    validate: val => {
      const numVal = Number(val);
      // check if the value is between 0 and 5 and is a valid half-step (half-step * 2 is a whole number)
      return numVal >= 0 && numVal <= 5 && (numVal * 2) % 1 === 0;
    },
    errorMessage: "Ranking must be between 0 and 10 and in increments of 0.5",
  },
  {
    name: "review",
    label: "Review",
    as: "textarea",
    rows: 10,
    fullRow: true,
    required: true,
    validate: val => val.length <= 5000,
    errorMessage: "Review must be under 5000 characters"
  }
];

function MovieReviewForm({ onSubmit, editingReview }) {
  return (
    <ReviewForm
      fields={movieFields}
      onSubmit={onSubmit}
      editingReview={editingReview}
    />
  );
}

export default MovieReviewForm;
