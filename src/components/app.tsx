import * as React from "react";
import { hashHistory } from "react-router";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { Feed } from "./Feed";

const App = () => (
  <BrowserRouter history={hashHistory}>
    <div>
      <Route exact path="/" render={() => <Redirect to="/feed/picks/" />} />
      <Route path="/feed/:sorting/" component={Feed} />
    </div>
  </BrowserRouter>
);

export { App };
