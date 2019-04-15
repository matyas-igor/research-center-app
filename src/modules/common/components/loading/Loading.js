// @flow

import React, { Fragment } from 'react';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  progressWrapper: {
    position: 'absolute',
    paddingBottom: theme.spacing.unit * 2,
  },
  progressSpacer: {
    minHeight: theme.spacing.unit * 6,
  },
  content: {
    width: '100%',
  },
});

type Props = {
  show: boolean,
  classes: Object,
  children: any,
};

/*
 * Helper component which renders progress when loading is in progress
 * After loading is done progress transits fade-out and content fade-in
 */
const Loading = (props: Props) => {
  const { show, classes, children } = props;
  return (<Fragment>
    {/* Loader */}
    <Fade
      in={show}
      className={classes.progressWrapper}
    >
      <Grid container direction="row" justify="center">
        <CircularProgress className={classes.progress} />
      </Grid>
    </Fade>
    <Fade
      in={!show}
      className={classNames(classes.content, show && classes.progressSpacer)}
    >
      {/* Content */}
      <div>{children}</div>
    </Fade>
  </Fragment>);
};

export default withStyles(styles)(Loading);
