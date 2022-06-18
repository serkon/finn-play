import { useNavigate } from 'react-router-dom';
import { Button } from 'src/common/component/button/button.component';
import { Header } from 'src/common/component/header/header.component';
import { useTranslate } from 'src/common/component/translate/translate.component';
import { Authenticator } from 'src/common/component/user/authenticator.component';

import './home.screen.scss';

export const HomeScreen = (): JSX.Element => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const signOut = () => {
    Authenticator.signOut({ callback: () => navigate('/') });
  };

  return (
    <>
      <Header className="header">
        <div className="container">
          <div className="row">
            <div className="col-xs-12" style={{ alignItems: 'center' }}>
              <img src="/images/common/logo.svg" alt="logo" className="logo" />
              <p style={{ flexGrow: 1, textAlign: 'end' }}>{Authenticator.user?.name}</p>
              <Button type="submit" className="btn-error ghost signout-button" iconLeft="eyes" onClick={signOut}>
                {t('Logout')}
              </Button>
            </div>
          </div>
        </div>
      </Header>
      <div className="container main">
        <div className="row">
          <section className="col-xs-12 col-md-8 content">content</section>
          <section className="col-xs-12 col-md-4 filter">filter</section>
        </div>
      </div>
    </>
  );
};
