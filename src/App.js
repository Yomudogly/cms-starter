import React from "react";
import "./firebase/config";
import "./pages/Signup";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import { UserProvider } from "./firebase/UserProvider";
import ProfileRedirect from "./router/ProfileRedirect";
import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from "./router/AdminRoute";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Switch>
          <ProfileRedirect exact path='/signup' component={Signup} />
          <ProfileRedirect exact path='/login' component={Login} />
          <PrivateRoute exact path='/profile/:id' component={Profile} />
          <AdminRoute exact path='/users' component={Users} />
          <Route exact path='/'>
            <Redirect to='/login' />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
