import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { getCurrentUser } from '../graphql/query/users';

const PrivateRoute = ({ component: Component, data, ...rest }) => {
  const {loading, error, CurrentUser } = data;
  if (error) {
    console.log(error.graphQLErrors[0]);
  }
  return (
    <Route
      {...rest}
      render={props =>
        loading ? (<div>Loading</div>) :
          CurrentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default graphql(getCurrentUser)(PrivateRoute);
