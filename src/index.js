import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.5.0";
import "assets/css/demo.css";

import AdminLayout from "layouts/Admin.js";
import LoginPage from "views/LoginPage";
import 'react-notifications/lib/notifications.css';

import { QueryClient, QueryClientProvider } from "react-query";
import App from "App";
const queryClient = new QueryClient();


ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>

    <Switch>

    <Route path="/"> <App /> </Route>

    
    </Switch>
    </QueryClientProvider>,

  </BrowserRouter>,
  document.getElementById("root")
);




