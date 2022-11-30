import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Loadable from 'react-loadable';
import './scss/app.scss';
import MainLayout from './layouts/MainLayout';
import React, { Suspense } from 'react';

// const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const Pizza = React.lazy(() => import(/* webpackChunkName: "Pizza" */ './pages/Pizza'));

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Загрузка...</div>,
});

function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
