import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/common/component/button/button.component';
import { Games } from 'src/common/component/games/games.component';
import { Header } from 'src/common/component/header/header.component';
import { Input } from 'src/common/component/input/input.component';
import { useTranslate } from 'src/common/component/translate/translate.component';
import { Authenticator } from 'src/common/component/user/authenticator.component';
import { filter_game_by_search_string, set_game_columns } from 'src/common/store/reducers/GameReducer';

import './home.screen.scss';

export const HomeScreen = (): JSX.Element => {
  let timeout: number;
  const { t } = useTranslate();
  const navigate = useNavigate();
  const signOut = () => {
    Authenticator.signOut({ callback: () => navigate('/') });
  };
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const change = () => {
    const value = inputRef.current?.value;
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      if (typeof value === 'string' && value?.length >= 0) {
        dispatch(filter_game_by_search_string(inputRef.current?.value ? inputRef.current?.value : ''));
      }
    }, 400);
  };

  useEffect(() => {
    dispatch(set_game_columns(4));
  }, []);

  return (
    <>
      <Header className="header">
        <div className="container">
          <div className="row">
            <div className="col-xs-12" style={{ alignItems: 'center', flexDirection: 'row' }}>
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
          <section className="col-xs-12 col-md-8 content">
            <Games />
          </section>
          <section className="col-xs-12 col-md-4 filter">
            <Input label={t('Search')} iconRight="search" onInput={() => change()} ref={inputRef} />
          </section>
        </div>
      </div>
      <Button onClick={() => navigate('/about')}>Go to games</Button>
    </>
  );
};
