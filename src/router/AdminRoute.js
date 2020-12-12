import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSession } from "../firebase/UserProvider";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { user, isAdmin } = useSession();

  return (
    <Route
      {...rest}
      render={(props) =>
        !!user && isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `/login`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
