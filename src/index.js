import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './index.css';
import App from './App';
import Navbar from './Navbar';
import Login from './Login'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <Navbar/>
      <Outlet/>
    </>,
    errorElement: <center>Page Not Found 😥</center>,
    children:[
      {
        path: "/",
        element: <App />
      },
      {
        path: "/login",
        element: <Login/>,
      },
    ],
  },
  {
    path: "/",
    element: <App/>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
