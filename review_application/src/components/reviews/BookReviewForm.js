import ReviewForm from '../ReviewForm';

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
    validate: val => /^[a-zA-Z][a-zA-Z0-9 .-]*$/.test(val) && val.length <= 150,
    errorMessage: "Author must start with a letter and contain only valid characters (periods, underscores, numbers). Author length must be less than 150 characters"
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
    errorMessage: "Invalid release year. Year cannot be in the future and must be 4 digits if positive. Negative release year denotes BCE"
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
    errorMessage: "Ranking must be between 0 and 5 and in increments of 0.5",
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
