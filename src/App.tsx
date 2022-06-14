import './App.scss';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from './common/component/error-boundary/ErrorBoundary';
import { useTranslate } from './common/component/translate/translate.component';

function App() {
  const { t } = useTranslate();

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>{t('loading')}</div>}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
