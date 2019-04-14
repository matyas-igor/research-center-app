// @flow

import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing.unit,
  }
});

/*
 * Renders app header
 */
const Header = (props: any) => {
  const { classes } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" component={RouterLink} to="/" className={classes.icon}>
          <HomeOutlinedIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          Research-Center
        </Typography>
        <Button color="inherit" component={RouterLink} to="/auth/login">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Header);
