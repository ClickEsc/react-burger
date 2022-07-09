import React, { FC } from 'react';
import { RouteProps, Route, Redirect } from "react-router-dom";
import { shallowEqual } from 'react-redux';
import { useSelector } from '../../services/hooks';

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuthorized } = useSelector(store => store.auth.user, shallowEqual);
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
