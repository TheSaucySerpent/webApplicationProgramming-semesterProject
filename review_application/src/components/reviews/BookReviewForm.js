import ReviewForm from './ReviewForm';

const bookFields = [
  {
    name: "title",
    label: "Title",
    required: true,
    validate: val => val.length <= 150,
    errorMessage: "Title must be less than 150 characters"
  },
  {
    name: "author",
    label: "Author",
    required: true,
    validate: val => /^[a-zA-Z][a-zA-Z0-9 .-]*$/.test(val),
    errorMessage: "Author must start with a letter and contain only valid characters"
  },
  {
    name: "isbn",
    label: "ISBN",
    required: true,
    validate: val => /^\d{9}[\dXx]$|^\d{13}$/.test(val),
    errorMessage: "Invalid ISBN"
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
    max: 5,
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

function BookReviewForm({ onSubmit, editingReview }) {
  return (
    <ReviewForm
      fields={bookFields}
      onSubmit={onSubmit}
      editingReview={editingReview}
    />
  );
}

export default BookReviewForm;
