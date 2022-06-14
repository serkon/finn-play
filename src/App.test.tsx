import { render, screen } from '@testing-library/react';
import HomePage from './screens/home.screen';

test('renders learn react link', async () => {
  render(<HomePage />);
  const linkElement = await screen.getByRole('button', { name: /edit/i });

  expect(linkElement).toBeInTheDocument();
});
