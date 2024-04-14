import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import App from "../App";

const ProtectedRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  // Check authentication status here
  const isAuthenticated = localStorage.getItem("authToken");

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const Routes: React.FC = () => {
  return (
    <Router>
      <Route  path="/login" component={Login} />
      <Route path="/" component={App} />
    </Router>
  );
};

export default Routes;
