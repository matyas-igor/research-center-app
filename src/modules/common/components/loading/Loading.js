// @flow

import React, { Fragment } from 'react';

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
  },
});

type Props = {
  show: boolean,
  classes: Object,
  children: any,
};

const Loading = (props: Props) => {
  const { show, classes, children } = props;
  return (<Fragment>
    {/* Loader */}
    <Fade in={show} className={classes.progressWrapper}>
      <Grid container direction="row" justify="center">
        <CircularProgress className={classes.progress} />
      </Grid>
    </Fade>
    <Fade in={!show}>
      {/* Content */}
      <div>{children}</div>
    </Fade>
  </Fragment>);
};

export default withStyles(styles)(Loading);
