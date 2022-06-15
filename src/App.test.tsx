import { render, screen } from '@testing-library/react';
import { HomeScreen } from 'src/screens/home.screen';

test('renders learn react link', async () => {
  render(<HomeScreen />);
  const linkElement = await screen.getByRole('button', { name: /edit/i });

  expect(linkElement).toBeInTheDocument();
});
