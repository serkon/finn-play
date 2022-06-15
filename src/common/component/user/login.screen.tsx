import { useLocation, useNavigate } from 'react-router-dom';
import type { Location } from 'history';
import { Authenticator } from './authenticator.component';

export const LoginScreen = () => {
  const navigate = useNavigate();
  const location: Location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    Authenticator.signIn(
      { username, password },
      () => navigate(from, { replace: true }),
      () => console.log('error war'),
    );
  };

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onClick={handleSubmit}>
        <label>
          Username: <input name="username" type="text" defaultValue={'john1@doe.com'} />
          Password: <input name="password" type="text" defaultValue={'1234567'} />
        </label>{' '}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
