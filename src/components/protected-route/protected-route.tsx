import React, { FC, ReactNode } from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector, shallowEqual } from 'react-redux';

const ProtectedRoute: FC<{ path: string, exact?: boolean, children: ReactNode, rest?: any }> = ({ children, ...rest }) => {
  const { isAuthorized } = useSelector((store: { auth: { user: any }}) => store.auth.user, shallowEqual);
  return (
    <Route
      {...rest}
      render={({ location }) => 
      isAuthorized
        ? children
        : <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
      }
    />
)}

export default ProtectedRoute;
