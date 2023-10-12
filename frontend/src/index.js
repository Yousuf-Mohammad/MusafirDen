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
import RegisterScreen from './screens/RegisterScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import PaymentScreeen from './screens/PaymentScreeen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreeen from './screens/admin/ProductListScreeen'
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path="/" element={<HomeScreen/>} />
      <Route  path="/product/:id" element={<ProductScreen/>} />
      <Route  path="/login" element={<LoginScreen/>} />
      <Route  path="/register" element={<RegisterScreen/>} />
      <Route  path="/cart" element={<CartScreen/>} />
      
      <Route path='' element={<PrivateRoute/>}>
        <Route  path="/shipping" element={<ShippingScreen/>} />
        <Route  path="/payment" element={<PaymentScreeen/>} />
        <Route  path="/placeorder" element={<PlaceOrderScreen/>} />
        <Route  path="/orders/:id" element={<OrderScreen/>} />
        <Route  path="/profile" element={<ProfileScreen/>} />
    
      </Route>

      <Route path='' element={<AdminRoute/>}>
        <Route  path="/admin/orderlist" element={<OrderListScreen/>} />
        <Route  path="/admin/productlist"element={<ProductListScreeen/>} />
        <Route  path="/admin/product/:id/edit"element={<ProductEditScreen/>} />

        <Route  path="/admin/userlist"element={<UserListScreen/>} />
        <Route  path="/admin/user/:id/edit"element={<UserEditScreen/>} />
    
      </Route>
      

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
