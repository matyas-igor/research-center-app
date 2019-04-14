// @flow

import React from 'react';

import { compose } from 'recompose';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import PollIcon from '@material-ui/icons/Poll';

import { API_URL, withGetFetching } from '../../../utils/network';
import Loading from '../../common/components/loading/Loading';

const styles = theme => ({
  title: {
    [theme.breakpoints.down('md')]: {
      fontSize: '2.5rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  subtitle: {
    marginBottom: theme.spacing.unit * 2,
  },
  list: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
    [theme.breakpoints.up('lg')]: {
      width: 480,
    },
  },
  listWrapper: {
    width: '100%',
    position: 'relative',
  },
  content: {
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing.unit * 4,
      paddingRight: theme.spacing.unit * 4,
    },
  },
});

type Props = {
  classes: Object,
  loading: boolean,
  data: {
    surveys: Array<any>,
  },
};

export const SurveysList = (props: Props) => {
  const { classes, loading, data, history } = props;
  const goToSurvey = (id: string) => { history.push(`/surveys/${id}`); };
  return (
    <Grid container direction="column" alignItems="center" className={classes.content}>
      <Typography
        component="h1"
        variant="h3"
        align="center"
        className={classes.title}
        gutterBottom
      >
        Welcome to our research center!
      </Typography>
      <Typography
        component="p"
        variant="subtitle1"
        color="textSecondary"
        align="center"
        className={classes.subtitle}
        gutterBottom
      >
        Select a survey to start
      </Typography>

      <div className={classes.listWrapper}>
        <Loading show={loading}>
          <Paper className={classes.list}>
            <List>
              {!loading && data.surveys.map((survey, idx) => (
                <ListItem key={idx} button onClick={() => goToSurvey(survey.id)}>
                  <Avatar>
                    <PollIcon />
                  </Avatar>
                  <ListItemText primary={survey.title} secondary={survey.tagline} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Loading>
      </div>
    </Grid>
  );
};

export default compose(
  withGetFetching(`${API_URL}/surveys`),
  withStyles(styles),
)(SurveysList);