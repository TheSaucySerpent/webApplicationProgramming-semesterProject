import { render, screen, fireEvent } from '@testing-library/react';
import GameReviewForm from './GameReviewForm';

describe('GameReviewForm Rendering', () => {
  test('game form renders all input fields', () => {
    render(<GameReviewForm onSubmit={() => {}} />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/developer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/play time \(hrs\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/release year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ranking/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/review/i)).toBeInTheDocument();
  });
});

describe('GameReviewForm Validation', () => {
  window.alert = jest.fn(); // needed to mock window alerts

  test('shows error for too long title', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'A'.repeat(151) } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: 'Naughty Dog' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '2013' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Amazing game!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Title must be less than 150 characters');
  });

  test('shows error for too long developer', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'The Last of Us' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: 'A'.repeat(151) } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '2013' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Amazing game!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Developer must be less than 150 characters and can start with a letter or number');
  });

  test('shows error for developer starting with special character', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'The Last of Us' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: '-Naughty Dog' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '2013' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Amazing game!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Developer must be less than 150 characters and can start with a letter or number');
  });

  test('shows error for too long genre', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'The Last of Us' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: 'Naughty Dog' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'A'.repeat(151) } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '2013' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Amazing game!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Genre must be less than 150 characters and can start with a letter or number');
  });

  test('shows error for genre starting with special character', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'The Last of Us' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: 'Naughty Dog' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: '.Action' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '2013' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Amazing game!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Genre must be less than 150 characters and can start with a letter or number');
  });

  test('shows error for negative play time', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'The Last of Us' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: 'Naughty Dog' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '-1' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '2013' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Amazing game!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Play time must be a non-negative number');
  });

  test('shows error for NAN play time', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'The Last of Us' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: 'Naughty Dog' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: 'gg' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '2013' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Amazing game!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Play Time (hrs) is required.');
  });

  test('shows error for negative release year', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'The Last of Us' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: 'Naughty Dog' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '-1000' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Amazing game!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Release year must be 4 digits, positive, and cannot be greater than the current year');
  });

  test('shows error for release year less than 4 digits', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'The Last of Us' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: 'Naughty Dog' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '20' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Amazing game!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Release year must be 4 digits, positive, and cannot be greater than the current year');
  });

  test('shows error for release year greater than 4 digits', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'The Last of Us' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: 'Naughty Dog' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '20023' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Amazing game!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Release year must be 4 digits, positive, and cannot be greater than the current year');
  });

  test('shows error for release year in the future', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'The Last of Us' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: 'Naughty Dog' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '2026' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Amazing game!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Release year must be 4 digits, positive, and cannot be greater than the current year');
  });

  test('shows error when ranking is negative', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'The Last of Us' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: 'Naughty Dog' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '2013' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '-1' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Amazing game!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Ranking must be between 0 and 10 and in increments of 0.5');
  });

  test('shows error when ranking is greater than upper bound', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'The Last of Us' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: 'Naughty Dog' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '2013' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '11' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Amazing game!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Ranking must be between 0 and 10 and in increments of 0.5');
  });

  test('shows error when ranking is not increment of 0.5', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'The Last of Us' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: 'Naughty Dog' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '2013' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '9.4' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Amazing game!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Ranking must be between 0 and 10 and in increments of 0.5');
  });

  test('shows error when review is over 5000 characters', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'The Last of Us' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: 'Naughty Dog' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '2013' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'A'.repeat(5001) } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Review must be under 5000 characters');
  });
});

describe('GameReviewForm Submission', () => {
  test('calls onSubmit with correct data when form is filled out', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'The Last of Us' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: 'Naughty Dog' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '2013' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Amazing game!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'The Last of Us',
      developer: 'Naughty Dog',
      genre: 'Action',
      play_time: 32,
      release_year: 2013,
      ranking: 10,
      review: 'Amazing game!'
    });
  });

  test('calls onSubmit with correct numbers in developer', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Bioshock 2' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: '2k, Irrational Games' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '2013' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Amazing game!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Bioshock 2',
      developer: '2k, Irrational Games',
      genre: 'Action',
      play_time: 32,
      release_year: 2013,
      ranking: 10,
      review: 'Amazing game!'
    });
  });

  test('calls onSubmit with special characters in developer', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Bioshock 2' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: '2.k, Irrational-Games' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Action' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '32' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '2013' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Amazing game!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Bioshock 2',
      developer: '2.k, Irrational-Games',
      genre: 'Action',
      play_time: 32,
      release_year: 2013,
      ranking: 10,
      review: 'Amazing game!'
    });
  });

  test('calls onSubmit with correct numbers in genre', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Fortnite' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: 'Epic Games' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: '3rd Person Shooter' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '2017' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '9.5' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Fun battle royale!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Fortnite',
      developer: 'Epic Games',
      genre: '3rd Person Shooter',
      play_time: 100,
      release_year: 2017,
      ranking: 9.5,
      review: 'Fun battle royale!'
    });
  });

  test('calls onSubmit with special characters in genre', () => {
    const mockSubmit = jest.fn();
    render(<GameReviewForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Fortnite' } });
    fireEvent.change(screen.getByLabelText(/developer/i), { target: { value: 'Epic Games' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: '3rd-Person-Shooter.f-u-n' } });
    fireEvent.change(screen.getByLabelText(/play time/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/release year/i), { target: { value: '2017' } });
    fireEvent.change(screen.getByLabelText(/ranking/i), { target: { value: '9.5' } });
    fireEvent.change(screen.getByLabelText(/review/i), { target: { value: 'Fun battle royale!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Fortnite',
      developer: 'Epic Games',
      genre: '3rd-Person-Shooter.f-u-n',
      play_time: 100,
      release_year: 2017,
      ranking: 9.5,
      review: 'Fun battle royale!'
    });
  });
});
