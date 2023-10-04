import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import './assets/CSS/bootstrap.custom.css';
import './assets/CSS/index.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import store from './store';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import ShippingScreen from './screens/ShippingScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path="/" element={<HomeScreen/>} />
      <Route  path="/product/:id" element={<ProductScreen/>} />
      <Route  path="/login" element={<LoginScreen/>} />
      <Route  path="/cart" element={<CartScreen/>} />
      <Route  path="/shipping" element={<ShippingScreen/>} />
      

    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router= {router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
