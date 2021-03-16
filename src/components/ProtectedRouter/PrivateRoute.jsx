import React from "react";
import { Redirect, Route } from "react-router";
import { AuthContex } from "./AuthContex";

export function PrivateRoute({ component: RouteComponent, ...rest }) {
  const { currentUser } = React.useContext(AuthContex);
  return (
    <Route
      {...rest}
      render={(props) =>
        !!currentUser ? <RouteComponent {...props} /> : <Redirect to="/" />
      }
    />
  );
}
