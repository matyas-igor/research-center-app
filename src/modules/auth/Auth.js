// @flow

import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link as RouteLink, Redirect } from 'react-router-dom';

import Login from './login/AuthLogin';

export default (props: any) => (
  <Switch>
    <Route path="/auth" exact component={Login} />
    <Route path="/auth/login" exact component={Login} />
  </Switch>
);