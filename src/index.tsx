import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Loader from './components/loader/Loader';
import './index.css';

const LazyApp = React.lazy(() => import('./components/App'));

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <LazyApp />
  </Suspense>,
  document.getElementById('root'),
);
