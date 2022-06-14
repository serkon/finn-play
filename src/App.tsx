import './App.scss';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from './common/component/error-boundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>{'loading'}</div>}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
