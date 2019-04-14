// @flow

import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Basic from './basic/ProflieBasic';

export default () => (
  <Switch>
    <Route path="/profile" exact component={Basic} />
  </Switch>
);