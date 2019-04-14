// @flow

import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

/*
 * Renders simple example of profile page
 */
const ProfileBasic = () => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Igor Matias
        </Typography>
        <Typography component="p">
          Survey's participant
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" component={RouterLink} to="/surveys">
          Surveys
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProfileBasic;
