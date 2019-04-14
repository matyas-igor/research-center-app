// @flow

import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 2}px 0`,
  },
});

const Footer = (props: any) => {
  const { classes, layoutClassName } = props;
  return (
    <div className={classes.footer}>
      <div className={layoutClassName}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="subtitle1" color="textSecondary">
              <Link href={'https://daliaresearch.com'}>Dalia Research</Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="textSecondary">
              <Link href={'https://github.com/matyas-igor'}>Igor Matias</Link>, 2019
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default withStyles(styles)(Footer);
