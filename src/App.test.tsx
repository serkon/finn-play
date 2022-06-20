import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HomeScreen } from 'src/screens/home/home.screen';
import configureStore from 'redux-mock-store';

test('renders learn react link', async () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <BrowserRouter>
        <HomeScreen />
      </BrowserRouter>
    </Provider>,
  );
  const linkElement = await screen.getByRole('button', { name: /edit/i });

  expect(linkElement).toBeInTheDocument();
});
