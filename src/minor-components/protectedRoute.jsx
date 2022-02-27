import React from "react";
import { Route, Redirect } from "react-router-dom";
const ProtectedRoute = ({
  path,
  component: Component,
  render,
  routeIsAllowed,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return !routeIsAllowed ? (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        ) : Component ? (
          <Component {...props} />
        ) : (
          render(props)
        );
      }}
    />
  );
};

export default ProtectedRoute;
