import { render, screen, fireEvent } from '@testing-library/react';
import BookReviewForm from './BookReviewForm';

describe('BookReviewForm Rendering', () => {
  window.alert = jest.fn(); // needed to mock window alerts

  test('form renders all input fields', () => {
    render(<BookReviewForm onSubmit={() => {}} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/isbn/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/release year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ranking/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/review/i)).toBeInTheDocument();
  });
});

describe('BookReviewForm Validation', () => {
  test('shows error for too long title', () => {
    const mockSubmit = jest.fn();
    render(<BookReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'A'.repeat(151) } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Herman Melville' } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '0141199601' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '1851' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '4.5' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'I loved reading this book for my Moby Dick course!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Title must be less than 150 characters');
  });

  test('shows error for too short ISBN', () => {
    const mockSubmit = jest.fn();
    render(<BookReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Moby Dick' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Herman Melville' } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '1851' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '4.5' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'I loved reading this book for my Moby Dick course!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Invalid ISBN');
  });

  test('shows error for too long ISBN', () => {
    const mockSubmit = jest.fn();
    render(<BookReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Moby Dick' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Herman Melville' } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '1'.repeat(15) } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '1851' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '4.5' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'I loved reading this book for my Moby Dick course!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Invalid ISBN');
  });

  test('shows error for 13-digit ISBN with X', () => {
    const mockSubmit = jest.fn();
    render(<BookReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Moby Dick' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Herman Melville' } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '123456789012X' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '1851' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '4.5' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'I loved reading this book for my Moby Dick course!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Invalid ISBN');
  });

  test('shows error for invalid characters in author', () => {
    const mockSubmit = jest.fn();
    render(<BookReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Moby Dick' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Author_Name' } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '0141199601' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '1851' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '4.5' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'I loved reading this book for my Moby Dick course!' } });
  
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Author must start with a letter and contain only valid characters (periods, underscores, numbers). Author length must be less than 150 characters");
  });

  test('shows error when author starts with number', () => {
    const mockSubmit = jest.fn();
    render(<BookReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Moby Dick' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: '123Author' } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '0141199601' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '1851' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '4.5' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'I loved reading this book for my Moby Dick course!' } });
  
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Author must start with a letter and contain only valid characters (periods, underscores, numbers). Author length must be less than 150 characters");
  });

  test('shows error when author too long', () => {
    const mockSubmit = jest.fn();
    render(<BookReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Moby Dick' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'A'.repeat(151) } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '0141199601' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '1851' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '4.5' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'I loved reading this book for my Moby Dick course!' } });
  
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Author must start with a letter and contain only valid characters (periods, underscores, numbers). Author length must be less than 150 characters");
  });

  test('shows error when positive release year less than 4 digits', () => {
    const mockSubmit = jest.fn();
    render(<BookReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Moby Dick' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Herman Melville' } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '0141199601' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '18' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '4.5' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'I loved reading this book for my Moby Dick course!' } });
  
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Invalid release year. Year cannot be in the future and must be 4 digits if positive. Negative release year denotes BCE");
  });

  test('shows error when positive release year is in future', () => {
    const mockSubmit = jest.fn();
    render(<BookReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Moby Dick' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Herman Melville' } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '0141199601' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '2026' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '4.5' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'I loved reading this book for my Moby Dick course!' } });
  
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Invalid release year. Year cannot be in the future and must be 4 digits if positive. Negative release year denotes BCE");
  });

  test('shows error when positive release year greater than 4 digits', () => {
    const mockSubmit = jest.fn();
    render(<BookReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Moby Dick' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Herman Melville' } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '0141199601' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '20025' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '4.5' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'I loved reading this book for my Moby Dick course!' } });
  
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Invalid release year. Year cannot be in the future and must be 4 digits if positive. Negative release year denotes BCE");
  });

  test('shows error when ranking is negative', () => {
    const mockSubmit = jest.fn(); 
    render(<BookReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Moby Dick' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Herman Melville' } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '0141199601' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '1851' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '-1' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'I loved reading this book for my Moby Dick course!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByLabelText(/ranking/i).validity.valid).toBe(false);
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Ranking must be between 0 and 5 and in increments of 0.5')
  });

  test('shows error when ranking is greater than upper bound', () => {
    const mockSubmit = jest.fn(); 
    render(<BookReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Moby Dick' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Herman Melville' } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '0141199601' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '1851' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '6' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'I loved reading this book for my Moby Dick course!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByLabelText(/ranking/i).validity.valid).toBe(false);
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Ranking must be between 0 and 5 and in increments of 0.5')
  });

  test('shows error when ranking is not increment of 0.5', () => {
    const mockSubmit = jest.fn(); 
    render(<BookReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Moby Dick' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Herman Melville' } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '0141199601' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '1851' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '4.2' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'I loved reading this book for my Moby Dick course!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByLabelText(/ranking/i).validity.valid).toBe(false);
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Ranking must be between 0 and 5 and in increments of 0.5')
  });

  test('shows error and does not submit when review is over 5000 characters', () => {
    const mockSubmit = jest.fn();
    render(<BookReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Moby Dick' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Herman Melville' } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '0141199601' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '1851' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '4.5' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'A'.repeat(5001) } });
  
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Review must be under 5000 characters");
  });
});

describe('BookReviewForm Submission', () => {
  test('submits valid form with 13-digit ISBN', () => {
    const mockSubmit = jest.fn();
    render(<BookReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Moby Dick' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Herman Melville' } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '9780141199603' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '1851' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '4.5' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'I loved reading this book for my Moby Dick course!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Moby Dick',
      author: 'Herman Melville',
      isbn: '9780141199603',
      release_year: 1851,
      ranking: 4.5,
      review: 'I loved reading this book for my Moby Dick course!'
    });
  });

  test('submits valid form with 10-digit ISBN', () => {
    const mockSubmit = jest.fn();
    render(<BookReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Moby Dick' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Herman Melville' } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '0141199601' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '1851' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '4.5' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'I loved reading this book for my Moby Dick course!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Moby Dick',
      author: 'Herman Melville',
      isbn: '0141199601',
      release_year: 1851,
      ranking: 4.5,
      review: 'I loved reading this book for my Moby Dick course!'
    });
  });

  test('submits valid form with 10-digit ISBN ending in X', () => {
    const mockSubmit = jest.fn();
    render(<BookReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Moby Dick' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Herman Melville' } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '014119960X' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '1851' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '4.5' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'I loved reading this book for my Moby Dick course!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Moby Dick',
      author: 'Herman Melville',
      isbn: '014119960X',
      release_year: 1851,
      ranking: 4.5,
      review: 'I loved reading this book for my Moby Dick course!'
    });
  });

  test('submits valid form with valid special characters in author', () => {
    const mockSubmit = jest.fn();
    render(<BookReviewForm onSubmit={mockSubmit} />);
  
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Moby Dick'} });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Herman-Melville.FakeName The 1st' } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '0141199601' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '1851' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '4.5' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'I loved reading this book for my Moby Dick course!' } });
  
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Moby Dick',
      author: 'Herman-Melville.FakeName The 1st',
      isbn: '0141199601',
      release_year: 1851,
      ranking: 4.5,
      review: 'I loved reading this book for my Moby Dick course!'
    });
  });

  test('allows negative release year for denoting BCE', () => {
    const mockSubmit = jest.fn();
    render(<BookReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'The Odyssey' } });
    fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Homer' } });
    fireEvent.change(screen.getByLabelText(/isbn/i), { target: { value: '9388144295' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: {value: '-8' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: {value: '5' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'This book is amazing!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'The Odyssey',
      author: 'Homer',
      isbn: '9388144295',
      release_year: -8,
      ranking: 5,
      review: 'This book is amazing!'
    });
  });
});