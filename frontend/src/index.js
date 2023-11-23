import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter as Router,
  createRoutesFromElements,
  Route,
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index={true} path="/" element={<HomeScreen />}/>
    <Route path="/product/:id" element={<ProductScreen />}/>
    <Route path="/cart" element={<CartScreen />}/>
    <Route path="/login" element={<LoginScreen />}/>

  </Route>
  )

);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
