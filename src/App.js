import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.5.0";
import "assets/css/demo.css";

import AdminLayout from "layouts/Admin.js";
import LoginPage from "views/LoginPage";
import "react-notifications/lib/notifications.css";
import { useHistory } from "react-router-dom";
import ForgetPassword from "views/ForgetPassword";



function App() {
  let history = useHistory();

  const [UserAuth, setUserAuth] = useState(null);
  useEffect(() => {
    const getUser = sessionStorage.getItem("MAXTOYS");
    const user = JSON.parse(getUser);
    // console.log(user.time);
    if (user) {
      setUserAuth(user);

      let time =
        new Date().getTime() / 1000 - new Date(user.time).getTime() / 1000;

      let totalTime = time / 60;
      if (totalTime >= 1440) {
        sessionStorage.removeItem("MAXTOYS");
        history.push("/login");
        window.location.reload();
      }
    }
    history.push("/login");
  }, []);

  return (
    <>
      <BrowserRouter>
        <Switch>
          
        <Route path="/forgetPassword">
                <ForgetPassword />
              </Route>
          {!UserAuth ? (
            <>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route
                path="/forgetPassword"
                render={(props) => <ForgetPassword />}/>
              <Redirect to="/login" />
            </>
          ) : (
            <>
              <Route
                path="/admin"
                render={(props) => <AdminLayout {...props} />}
              />
              <Redirect to="/admin/dashboard" />
              {/* <Redirect to="/maxtoys/admin/" /> */}
            </>
          )}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
