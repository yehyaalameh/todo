import React, { Suspense } from 'react';
import { RouteObject } from 'react-router';
import authRoutes from './auth';

const Loader = (Component) => (props) =>
  (
    <Suspense >
      <Component {...props} />
    </Suspense>
  );
  
const List = Loader(React.lazy(() => import('../components/List')));
const Login = Loader(React.lazy(() => import('../components/Login')));

const router: RouteObject[] = [
  // Auth Routes
  {
    path: "auth",
    element: <Login />,
    
  },
  {
    path: "list",
    element: <List />,
   
  },

  // Privacy policy Routes
  // Authenticated Routes
 
];

export default router;