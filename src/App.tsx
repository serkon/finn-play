import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import '@fontsource/prompt';

import { ErrorBoundary } from './common/component/error-boundary/ErrorBoundary';
import { useTranslate } from './common/component/translate/translate.component';
import { useMobile } from './common/hooks/mobile.hook';
import './App.scss';

function App() {
  const { t } = useTranslate();
  useMobile();

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>{t('loading')}</div>}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
