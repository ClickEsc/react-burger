import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from "react-router-dom";
import { useSelector, shallowEqual } from 'react-redux';

export default function ProtectedRoute({ children, ...rest }) {
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


ProtectedRoute.propTypes = {
  children: PropTypes.element,
  rest: PropTypes.object
};

ProtectedRoute.defaultProps = {
  children: <></>,
  rest: {}
};