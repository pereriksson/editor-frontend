import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event";

test('renders the login form', async () => {
  render(<App />);
  const loginLabel = await screen.findAllByText(/Login/i);
  expect(loginLabel).toHaveLength(2);
});