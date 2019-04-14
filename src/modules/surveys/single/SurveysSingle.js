// @flow

import React, { Fragment, Component } from 'react';

import { Redirect } from 'react-router-dom';
import classNames from 'classnames';

import isNumber from 'lodash/isNumber';
import parseInt from 'lodash/parseInt';

import { compose } from 'recompose';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Radio from '@material-ui/core/Radio';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import ReplayIcon from '@material-ui/icons/Replay';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SchoolIcon from '@material-ui/icons/School';

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
  card: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up('lg')]: {
      width: 480,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardWrapper: {
    width: '100%',
    position: 'relative',
  },
  content: {
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
  },
  buttonsWrapper: {
    marginBottom: theme.spacing.unit * 2,
  },
  optionsList: {
    marginLeft: -theme.spacing.unit * 2,
    marginRight: -theme.spacing.unit * 2,
    marginBottom: -theme.spacing.unit * 2,
  },
  optionsListItem: {
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
  },
  button: {
    marginRight: theme.spacing.unit * 2,
  },
  iconLeft: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 16,
  },
  avatar: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: theme.palette.secondary.main,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

type Props = {
  classes: Object,
  loading: boolean,
  data: {
    survey: {
      title: string,
      tagline: string,
      questions: Array<any>,
    },
  },
  match: {
    props: {
      id: string,
      number?: string,
    },
  },
};

class SurveysSingle extends Component<Props, any> {
  state = {
    // Answered questions, by default set it to null to check the case
    // when user was navigated directly to the middle of the test
    answers: null,
  };

  /*
   * Simple helper to check if param is defined and correct
   * @returns null if param is in incorrect format
   */
  getNumber = (number: string) => {
    if (!number) {
      return null;
    }
    if (number === 'start' || number === 'finish') {
      return number;
    }
    if (number.startsWith('question-')) {
      const numberParsed = parseInt(number.replace('question-', ''));
      if (isNumber(numberParsed)) {
        return numberParsed;
      }
    }

    return null;
  };

  // Go back to all surveys list
  goToSurveysList = () => {
    const { history } = this.props;
    history.push(`/surveys`);
  };

  // Begin survey - start answering questions with clearing previous answers
  doStartSurvey = () => {
    const { history, match } = this.props;
    this.setState({ answers: [] }, () => {
      // Navigate to first question
      history.push(`/surveys/${match.params.id}/question-1`);
    });
  };

  // Restart survey - clear answers and move to start
  doRestartSurvey = () => {
    const { history, match } = this.props;
    this.setState({ answers: null }, () => {
      // Navigate to first question
      history.push(`/surveys/${match.params.id}/start`);
    });
  };

  // Save questions answers & move to next stage if needed
  doAnswerQuestion = (idx: number, questions: Array<any>, question_id: string, value: string) => {
    const { match, history } = this.props;
    this.setState(({ answers }) => {
      // make copy of an existing array and set new value at a given index
      const newAnswers = [...answers];
      newAnswers[idx] = { question_id, value };
      return { answers: newAnswers };
    }, () => {
      // calculate new number to set as url param
      const number = idx < questions.length - 1 ? `question-${idx + 2}` : 'finish';
      history.push(`/surveys/${match.params.id}/${number}`);
    });
  };

  // Renders start card
  renderStartCard = () => {
    const { classes, data } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Avatar className={classes.avatar}>
            <SchoolIcon />
          </Avatar>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Welcome to {data.survey.title} survey!
          </Typography>
          <Typography component="p" color="textSecondary" align="center">
            Start by pressing the button below
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container direction="row" justify="center" className={classes.buttonsWrapper}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={this.doStartSurvey}
              className={classes.button}
            >
              Start
            </Button>
          </Grid>
        </CardActions>
      </Card>
    );
  };

  // Renders finish card
  renderFinishCard = () => {
    const { classes, match } = this.props;
    const { answers } = this.state;

    if (!answers) {
      // user were navigated here directly - move to start
      return (<Redirect to={`/surveys/${match.params.id}/start`} />);
    }

    return (
      <Card className={classes.card}>
        <CardContent>
          <Avatar className={classes.avatar}>
            <WhatshotIcon />
          </Avatar>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Thank you for participating in our survey!
          </Typography>
          <Typography component="p" color="textSecondary" align="center">
            Answers have been successfully submitted
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container direction="row" justify="center" className={classes.buttonsWrapper}>
            <Button
              onClick={this.doRestartSurvey}
              className={classes.button}
            >
              <ReplayIcon className={classNames(classes.iconLeft, classes.iconSmall)} />
              Retry
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.goToSurveysList}
              className={classes.button}
            >
              Go to surveys list
            </Button>
          </Grid>
        </CardActions>
      </Card>
    );
  };
  
  // Renders question card
  renderQuestionCard = (number) => {
    const { match, classes, data } = this.props;
    const { answers } = this.state;

    if (!answers) {
      // user were navigated here directly - move to start
      return (<Redirect to={`/surveys/${match.params.id}/start`} />);
    }

    // Calculate question index in array
    const questionIndex = number - 1;
    // Current question which user is answering now
    const question = data.survey.questions[questionIndex];
    // Current answer in question, if user already answered this question
    const answer = answers[questionIndex];

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            Question: {questionIndex + 1} / {data.survey.questions.length}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {question.title}
          </Typography>
          <Typography component="p" color="textSecondary" gutterBottom>
            Select one of the answers below
          </Typography>
          <List className={classes.optionsList}>
            {question.options.map((value, idx) => (
              <ListItem
                key={`option-${questionIndex}-${idx}`}
                button
                className={classes.optionsListItem}
                onClick={() => this.doAnswerQuestion(questionIndex, data.survey.questions, question.id, value)}
              >
                <Radio
                  checked={!!(answer && answer.value === value)}
                  tabIndex={-1}
                />
                <ListItemText primary={value} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  };
  
  render() {
    const { classes, loading, data, match } = this.props;

    const number = this.getNumber(match.params.number);
    if (number === null) {
      // if number param from url is not defined - simply redirect to start
      return (<Redirect to={`/surveys/${match.params.id}/start`} />);
    }

    return (
      <Grid container direction="column" alignItems="center" className={classes.content}>
        <Loading show={loading}>
          {!loading && (<Fragment>
            <Typography
              component="h1"
              variant="h3"
              align="center"
              className={classes.title}
              gutterBottom
            >
              {data.survey.title}
            </Typography>
            <Typography
              component="p"
              variant="subtitle1"
              color="textSecondary"
              align="center"
              className={classes.subtitle}
              gutterBottom
            >
              {data.survey.tagline}
            </Typography>
            <div className={classes.cardWrapper}>
              {number === 'start' && this.renderStartCard()}
              {number === 'finish' && this.renderFinishCard()}
              {isNumber(number) && this.renderQuestionCard(number)}
            </div>
          </Fragment>)}
        </Loading>
      </Grid>

    );
  }
}

export default compose(
  withGetFetching(({ match }) => `${API_URL}/surveys/${match.params.id}`),
  withStyles(styles),
)(SurveysSingle);