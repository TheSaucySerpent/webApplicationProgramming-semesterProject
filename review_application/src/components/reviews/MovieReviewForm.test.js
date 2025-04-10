import { render, screen, fireEvent } from '@testing-library/react';
import MovieReviewForm from './MovieReviewForm';

describe('MovieReviewForm Rendering', () => {
  test('movie form renders all input fields', () => {
    render(<MovieReviewForm onSubmit={() => {}} />)

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/director/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/release year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ranking/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/review/i)).toBeInTheDocument();
  });
});

describe('MovieReviewForm Validation', () => {
  window.alert = jest.fn(); // needed to mock window alerts

  test('shows error for too long title', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'A'.repeat(151) } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: 'Morten Tyldum' } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: 'Thriller, War' } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '2014' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '5'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'I love this movie!'} });

    fireEvent.click(screen.getByRole('button', {
      name: /submit/i }));
    
      expect(mockSubmit).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Title must be less than 150 characters');
  });

  test('shows error for too long director', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'The Imitation Game' } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: 'A'.repeat(151) } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: 'Thriller, War' } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '2014' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '5'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'I love this movie!'} });

    fireEvent.click(screen.getByRole('button', {
      name: /submit/i }));
    
      expect(mockSubmit).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Director must be less than 150 characters and must start with a letter');
  });

  test('shows error for director starting with special character', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'The Imitation Game' } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: '-Morten Tyldum' } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: 'Thriller, War' } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '2014' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '5'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'I love this movie!'} });

    fireEvent.click(screen.getByRole('button', {
      name: /submit/i }));
    
      expect(mockSubmit).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Director must be less than 150 characters and must start with a letter');
  });

  test('shows error for director starting with number', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'The Imitation Game' } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: '1Morten Tyldum' } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: 'Thriller, War' } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '2014' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '5'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'I love this movie!'} });

    fireEvent.click(screen.getByRole('button', {
      name: /submit/i }));
    
      expect(mockSubmit).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Director must be less than 150 characters and must start with a letter');
  });

  test('shows error for too long genre', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'The Imitation Game' } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: 'Morten Tyldum' } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: 'A'.repeat(151) } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '2014' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '5'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'I love this movie!'} });

    fireEvent.click(screen.getByRole('button', {
      name: /submit/i }));
    
      expect(mockSubmit).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Genre must be less than 150 characters and can start with a letter or number');
  });

  test('shows error for genre starting with special character', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'The Imitation Game' } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: 'Morten Tyldum' } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: '-Thriller, War' } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '2014' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '5'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'I love this movie!'} });

    fireEvent.click(screen.getByRole('button', {
      name: /submit/i }));
    
      expect(mockSubmit).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Genre must be less than 150 characters and can start with a letter or number');
  });

  test('shows error for negative release year', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'The Imitation Game' } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: 'Morten Tyldum' } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: 'Thriller, War' } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '-2014' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '5'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'I love this movie!'} });

    fireEvent.click(screen.getByRole('button', {
      name: /submit/i }));
    
      expect(mockSubmit).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Release year must be 4 digits, positive, and cannot be greater than the current year');
  });

  test('shows error for release year less than 4 digits', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'The Imitation Game' } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: 'Morten Tyldum' } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: 'Thriller, War' } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '20' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '5'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'I love this movie!'} });

    fireEvent.click(screen.getByRole('button', {
      name: /submit/i }));
    
      expect(mockSubmit).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Release year must be 4 digits, positive, and cannot be greater than the current year');
  });

  test('shows error for release year greater than 4 digits', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'The Imitation Game' } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: 'Morten Tyldum' } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: 'Thriller, War' } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '20141' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '5'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'I love this movie!'} });

    fireEvent.click(screen.getByRole('button', {
      name: /submit/i }));
    
      expect(mockSubmit).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Release year must be 4 digits, positive, and cannot be greater than the current year');
  });

  test('shows error for release year in the future', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'The Imitation Game' } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: 'Morten Tyldum' } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: 'Thriller, War' } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '2026' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '5'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'I love this movie!'} });

    fireEvent.click(screen.getByRole('button', {
      name: /submit/i }));
    
      expect(mockSubmit).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Release year must be 4 digits, positive, and cannot be greater than the current year');
  });

  test('shows error for ranking is negative', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'The Imitation Game' } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: 'Morten Tyldum' } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: 'Thriller, War' } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '2014' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '-5'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'I love this movie!'} });

    fireEvent.click(screen.getByRole('button', {
      name: /submit/i }));
    
      expect(mockSubmit).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Ranking must be between 0 and 10 and in increments of 0.5');
  });

  test('shows error for ranking is greater than upper bound', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'The Imitation Game' } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: 'Morten Tyldum' } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: 'Thriller, War' } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '2014' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '6'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'I love this movie!'} });

    fireEvent.click(screen.getByRole('button', {
      name: /submit/i }));
    
      expect(mockSubmit).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Ranking must be between 0 and 10 and in increments of 0.5');
  });

  test('shows error for ranking is not increment of 0.5', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'The Imitation Game' } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: 'Morten Tyldum' } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: 'Thriller, War' } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '2014' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '4.9'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'I love this movie!'} });

    fireEvent.click(screen.getByRole('button', {
      name: /submit/i }));
    
      expect(mockSubmit).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Ranking must be between 0 and 10 and in increments of 0.5');
  });

  test('shows error for review is over 5000 characters', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'The Imitation Game' } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: 'Morten Tyldum' } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: 'Thriller, War' } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '2014' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '5'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'A'.repeat(5001) } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Review must be under 5000 characters');
  });
});

describe('MovieReviewForm Submission', () => {
  test('calls onSubmit with correct data when form is filled out', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'The Imitation Game' } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: 'Morten Tyldum' } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: 'Thriller, War' } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '2014' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '5'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'I love this movie!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'The Imitation Game',
      director: 'Morten Tyldum',
      genre: 'Thriller, War',
      release_year: 2014,
      ranking: 5,
      review: 'I love this movie!'
    });
  });

  test('calls onSubmit with correct numbers in director', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'The Imitation Game' } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: 'Morten Tyldum the 1st' } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: 'Thriller, War' } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '2014' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '5'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'I love this movie!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'The Imitation Game',
      director: 'Morten Tyldum the 1st',
      genre: 'Thriller, War',
      release_year: 2014,
      ranking: 5,
      review: 'I love this movie!'
    });
  });

  test('calls onSubmit with special characters in director', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'The Imitation Game' } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: 'Morten-Tyldum.the 1st' } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: 'Thriller, War' } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '2014' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '5'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'I love this movie!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'The Imitation Game',
      director: 'Morten-Tyldum.the 1st',
      genre: 'Thriller, War',
      release_year: 2014,
      ranking: 5,
      review: 'I love this movie!'
    });
  });

  test('calls onSubmit with correct numbers in genre', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'The Imitation Game' } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: 'Morten Tyldum' } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: '4D Experience, Thriller, War' } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '2014' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '5'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'I love this movie!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'The Imitation Game',
      director: 'Morten Tyldum',
      genre: '4D Experience, Thriller, War',
      release_year: 2014,
      ranking: 5,
      review: 'I love this movie!'
    });
  });

  test('calls onSubmit with special characters in genre', () => {
    const mockSubmit = jest.fn();
    render(<MovieReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'The Imitation Game' } });
    fireEvent.change(screen.getByLabelText(/director/i), {target: {value: 'Morten Tyldum' } });
    fireEvent.change(screen.getByLabelText(/genre/i), {target: {value: 'Thriller, War, War-Film.Thriller' } });
    fireEvent.change(screen.getByLabelText(/release year/i), {target: {value: '2014' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), {target: {value: '5'} });
    fireEvent.change(screen.getByLabelText(/review/i), {target: {value: 'I love this movie!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'The Imitation Game',
      director: 'Morten Tyldum',
      genre: 'Thriller, War, War-Film.Thriller',
      release_year: 2014,
      ranking: 5,
      review: 'I love this movie!'
    });
  });
})