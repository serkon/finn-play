import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HomeScreen } from 'src/screens/home/home.screen';

test('renders learn react link', async () => {
  render(
    <BrowserRouter>
      <HomeScreen />
    </BrowserRouter>,
  );
  const linkElement = await screen.getByRole('button', { name: /edit/i });

  expect(linkElement).toBeInTheDocument();
});
