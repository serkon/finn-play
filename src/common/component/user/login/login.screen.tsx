import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Location } from 'history';

import { Input } from 'src/common/component/input/input.component';
import { Authenticator } from 'src/common/component/user/authenticator.component';
import { Button } from 'src/common/component/button/button.component';
import './login.screen.scss';
import { useTranslate } from 'src/common/component/translate/translate.component';

export const LoginScreen = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const location: Location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';
  const [state, setState] = React.useState<{ error: string } | null>(null);
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    waiting(true);

    Authenticator.signIn(
      { username, password },
      () => {
        navigate(from, { replace: true });
        waiting(false);
      },
      () => {
        setState({ error: t('Invalid_email_or_password') });
        waiting(false);
      },
    );
  };
  const waiting = (status: boolean) => {
    setLoading(status);
  };

  return (
    <div className="login-screen container">
      <img src="/images/common/logo.svg" alt="logo" className="logo" />
      <p className="direction">You must log in to view the page at {from}</p>
      {state?.error && <p className="error">{state?.error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <Input label={t('Username')} defaultValue={'john@doe.com'} width="100%" name="username" />
        <Input label={t('Password')} defaultValue={'Asdf+321!'} type="password" name="password" iconRight="eyes" />
        <Button type="submit" className="btn-primary login-button" disabled={loading}>
          {!loading ? t('Login') : <img src="/images/common/loading.svg" className="loading-icon" />}
        </Button>
      </form>
    </div>
  );
};
