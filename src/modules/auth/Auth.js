// @flow

import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Login from './login/AuthLogin';

export default () => (
  <Switch>
    <Route path="/auth" exact component={Login} />
    <Route path="/auth/login" exact component={Login} />
  </Switch>
);