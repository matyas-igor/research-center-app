// @flow

import React from 'react';

import { Switch, Route } from 'react-router-dom';

import List from './list/SurveysList';
import Single from './single/SurveysSingle';

export default () => {
  return (
    <Switch>
      <Route path="/" exact component={List} />
      <Route path="/surveys" exact component={List} />
      <Route path="/surveys/:id" exact component={Single} />
      <Route path="/surveys/:id/:number" exact component={Single} />
    </Switch>
  );
};
