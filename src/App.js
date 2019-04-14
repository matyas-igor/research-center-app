// @flow

import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './modules/common/components/navigation/Header';
import Footer from './modules/common/components/navigation/Footer';

import Auth from './modules/auth/Auth';
import Profile from './modules/profile/Profile';
import Surveys from './modules/surveys/Surveys';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: '100vh',
  },
  layout: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
    },
    [theme.breakpoints.up('md')]: {
      width: theme.breakpoints.values.md,
      paddingLeft: 0,
      paddingRight: 0,
    },
    [theme.breakpoints.up('lg')]: {
      width: theme.breakpoints.values.lg,
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  content: {
    flex: 1,
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing.unit * 3,
      paddingBottom: theme.spacing.unit * 3,
    },
  },
});

type Props = {
  classes: object,
};

const App = (props: Props) => {
  const { classes } = props;
  return (
    <Router>
      <CssBaseline />
      <div className={classes.root}>
        <Route component={Header} />
        <div className={classNames(classes.layout, classes.content)}>
          <Switch>
            <Route path="/" exact component={Surveys} />
            <Route path="/surveys" component={Surveys} />
            <Route path="/profile" component={Profile} />
            <Route path="/auth" component={Auth} />
            <Redirect to="/" />
          </Switch>
        </div>
        <Footer layoutClassName={classes.layout}/>
      </div>
    </Router>
  );
};

export default withStyles(styles)(App);
