import ReviewForm from './ReviewForm';

const gameFields = [
  {
    name: "title",
    label: "Title",
    required: true,
    validate: val => val.length <= 150,
    errorMessage: "Title must be less than 150 characters"
  },
  {
    name: "developer",
    label: "Developer",
    required: true,
    validate: val => /^[a-zA-Z][a-zA-Z0-9 .,-]*$/.test(val),
    errorMessage: "Invalid developer name"
  },
  {
    name: "genre",
    label: "Genre",
    required: true,
    validate: val => /^[a-zA-Z][a-zA-Z0-9 .,-]*$/.test(val),
    errorMessage: "Invalid genre name"
  },
  {
    name: "play_time",
    label: "Play Time (hrs)",
    type: "number",
    required: true,
    validate: val => !isNaN(val) && Number(val) >= 0,
    errorMessage: "Play time must be a non-negative number"
  },
  {
    name: "release_year",
    label: "Release Year",
    type: "number",
    required: true,
    validate: val => {
      const year = Number(val);
      return (year < 0 || /^\d{4}$/.test(val)) && year <= new Date().getFullYear();
    },
    errorMessage: "Invalid release year"
  },
  {
    name: "ranking",
    label: "Ranking",
    type: "number",
    required: true,
    min: 0,
    max: 10,
    step: 0.5
  },
  {
    name: "review",
    label: "Review",
    as: "textarea",
    rows: 10,
    required: true,
    validate: val => val.length <= 5000,
    errorMessage: "Review must be under 5000 characters"
  }
];

function GameReviewForm({ onSubmit, editingReview }) {
  return (
    <ReviewForm
      fields={gameFields}
      onSubmit={onSubmit}
      editingReview={editingReview}
    />
  );
}

export default GameReviewForm;
