import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Location } from 'history';

import { Input } from 'src/common/component/input/input.component';
import { Authenticator } from 'src/common/component/user/authenticator.component';
import { Button } from 'src/common/component/button/button.component';
import './login.screen.scss';

export const LoginScreen = () => {
  const navigate = useNavigate();
  const location: Location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';
  const [state, setState] = React.useState<{ error: string } | null>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    Authenticator.signIn(
      { username, password },
      () => navigate(from, { replace: true }),
      () => setState({ error: 'Invalid username or password' }),
    );
  };

  return (
    <div className="login-screen container">
      <img src="/images/common/logo.svg" alt="logo" className="logo" />
      <p className="direction">You must log in to view the page at {from}</p>
      {state?.error && <p className="error">{state?.error}</p>}
      <form onClick={handleSubmit} className="login-form">
        <Input label="Login" defaultValue={'john@doe.com'} width="100%" name="username" />
        <Input label="Password" defaultValue={'1234567'} type="password" name="password" />
        <Button type="submit" className="btn-primary login-button">
          Login
        </Button>
      </form>
    </div>
  );
};
