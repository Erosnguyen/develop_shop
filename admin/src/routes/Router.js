import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ManageGenre from 'src/views/ManageGenre/ManageGenre';
import ManageUser from 'src/views/ManageUser/ManageUser';
import ManageBookBorrow from 'src/views/ManageBookBorrow/ManageBookBorrow';
import ManageStaff from 'src/views/ManageStaff/ManageStaff';
import ManageCard from 'src/views/ManageCard/ManageCard';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const ManageBook = Loadable(lazy(() => import('../views/ManageBook/ManageBook')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/manage-book', exact: true, element: <ManageBook /> },
      { path: '/manage-genre', exact: true, element: <ManageGenre /> },
      { path: '/manage-user', exact: true, element: <ManageUser /> },
      { path: '/manage-staff', exact: true, element: <ManageStaff /> },
      { path: '/manage-card', exact: true, element: <ManageCard /> },
      { path: '/manage-borrow-book', exact: true, element: <ManageBookBorrow /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
