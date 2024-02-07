import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { store } from './store';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductForm from './pages/ProductForm';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/products',
    element: (
      <ProtectedRoute>
        <Product />
      </ProtectedRoute>
    ),
  },
  {
    path: '/add-product',
    element: (
      <ProtectedRoute>
        <ProductForm />
      </ProtectedRoute>
    ),
  },
  {
    path: '/product/:id',
    element: (
      <ProtectedRoute>
        <ProductForm />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
