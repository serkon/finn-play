import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ScrollTo } from 'src/common/component/scroll/scroll.component';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Language } from 'src/common/component/translate/translate.component';

/**
 * Screens
 */
import HomePage from './screens/home.screen';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollTo />
      <Language default="en">
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<HomePage />} />
          </Route>
        </Routes>
      </Language>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
