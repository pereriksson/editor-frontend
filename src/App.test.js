import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event";

test('renders the header', () => {
  render(<App />);
  const saveLabel = screen.getByText(/save/i);
  expect(saveLabel).toBeInTheDocument();
  const newLabel = screen.getByText(/new/i);
  expect(newLabel).toBeInTheDocument();
  const openLabel = screen.getByText(/open/i);
  expect(openLabel).toBeInTheDocument();
});

test('displays the open dialog', () => {
  render(<App />);
  const btn = screen.getByText(/open/i);
  btn.click();
  const text = screen.getByText(/select the document to open/i);
  expect(text).toBeInTheDocument();
});

test('resets the document', () => {
  render(<App />);
  const documentName = screen.getByPlaceholderText(/untitled document/i);
  userEvent.type(documentName, 'A document name');
  const newBtn = screen.getByText(/new/i);
  userEvent.click(newBtn);
  expect(documentName.value).toBe('');
});