import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ScrollTo } from 'src/common/component/scroll/scroll.component';
import { BrowserRouter, Navigate } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import { Language } from 'src/common/component/translate/translate.component';
import { store } from 'src/common/store/store';
import './index.scss';

/**
 * Screens
 */
import { HomeScreen } from 'src/screens/home/home.screen';
import { PageNotFound } from 'src/common/component/http/not-found.page';
import { Authenticator } from 'src/common/component/user/authenticator.component';
import { LoginScreen } from 'src/common/component/user/login/login.screen';
import { AboutScreen } from 'src/screens/about.screen';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const strickMode = process.env.NODE_ENV === 'production';
const Content = () => (
  <BrowserRouter>
    <ScrollTo />
    <Provider store={store}>
      <Language default="fi">
        <Routes>
          <Route path="/" element={<App />}>
            <Route
              path=""
              element={
                <Authenticator.Navigate>
                  <HomeScreen />
                </Authenticator.Navigate>
              }
            />
            <Route
              path="about"
              element={
                <Authenticator.Navigate>
                  <AboutScreen />
                </Authenticator.Navigate>
              }
            />
            <Route path="login" element={<LoginScreen />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Language>
    </Provider>
  </BrowserRouter>
);

root.render(
  (strickMode && (
    <React.StrictMode>
      <Content />
    </React.StrictMode>
  )) || <Content />,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

window.getVersion = () => process.env;
