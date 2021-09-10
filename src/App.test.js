import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the save button', () => {
  render(<App />);
  const btnLabel = screen.getByText(/Save/i);
  expect(btnLabel).toBeInTheDocument();
});

test('renders the new button', () => {
  render(<App />);
  const btnLabel = screen.getByText(/New/i);
  expect(btnLabel).toBeInTheDocument();
});

test('renders the open button', () => {
  render(<App />);
  const btnLabel = screen.getByText(/Open/i);
  expect(btnLabel).toBeInTheDocument();
});