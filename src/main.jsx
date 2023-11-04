import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Shop from './components/Shop/Shop.jsx';
import Home from './components/Layout/Home.jsx';
import Order from './components/Order/Order.jsx';
import Inventory from './components/Inventory/Inventory.jsx';
import Login from './components/Login/Login.jsx';
import cartProductLoder from './Loders/cartProductsLoder.js';
import Checkout from './components/Checkout/Checkout.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'shop',
        element: <Shop />
      },
      {
        path: 'order',
        element: <Order />,
        // loader: () => fetch('products.json'),
        loader: cartProductLoder,
      },
      {
        path: 'Manage Inventory',
        element: <Inventory />
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'login',
        element: <Login />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
