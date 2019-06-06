import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import update from 'immutability-helper';
import { fake } from 'faker';
import Sidebar from './Sidebar';
import List from './list/List';
import AppContext from '../AppContext';

const DEFAULT_INVITATION_COUNT = 10;
const generateInvitation = (_, id) => ({
  id,
  expanded: false,
  guestInfo: {
    name: fake(`{{name.firstName}}`),
    lastName: fake(`{{name.lastName}}`),
    table: fake(`{{random.number}}`) % 10 + 1,
    plusOne: Boolean(fake(`{{random.number}}`) % 2),
    sex: fake(`{{random.number}}`) % 3,
    sendBy: fake(`{{random.number}}`) % 4,
  },
});

const styles = theme => ({
  root: {
    minHeight: '100vh',
    margin: theme.spacing(1),
  },
  grid: {
    minHeight: '100vh',
  },
});

class App extends Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  state = {
    memo: false,
    pure: false,
    times: [],
    invitations: Array.from({ length: DEFAULT_INVITATION_COUNT }, generateInvitation),
    invitationsCount: DEFAULT_INVITATION_COUNT,
  };

  componentWillUpdate() {
      this.time = Date.now();
  }

  componentDidUpdate(prevProps, prevState) {
    this.refreshTimes(this.state.times === prevState.times);
  }

  refreshTimes(hasTimeChanged) {
    if (hasTimeChanged) {
      this.setState({ times: [
        Date.now() - this.time,
        ...this.state.times,
      ] });
    }
  }

  onChangeInvitationsCount = length => this.setState({
    invitations: Array.from({ length }, generateInvitation),
    invitationsCount: parseInt(length, 10),
  });

  onSaveAll = () => this.updateInvitations({
    $apply: invitations => invitations.map(invitation => ({ ...invitation, expanded: false }))
  });

  onEditAll = () => this.updateInvitations({
    $apply: invitations => invitations.map(invitation => ({ ...invitation, expanded: true }))
  });

  updateInvitations = invitations => {
    this.setState(update(this.state, { invitations }));
  };

  toggleMemoize = () => this.setState({ memo: !this.state.memo });

  toggleSCU = () => this.setState({ pure: !this.state.pure });

  render() {
    const { classes } = this.props;
    const { pure, memo } = this.state;

    return (
      <AppContext.Provider value={{ memo, pure }}>
        <Paper className={classes.root}>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={3}>
              <Sidebar
                memoize={this.state.memo}
                toggleMemoize={this.toggleMemoize}
                scu={this.state.pure}
                toggleSCU={this.toggleSCU}
                invitationsCount={this.state.invitationsCount}
                times={this.state.times}
                onChangeInvitationsCount={this.onChangeInvitationsCount}
              />
            </Grid>
            <Grid item xs={9}>
              <List
                memoize={this.state.memo}
                scu={this.state.pure}
                invitations={this.state.invitations}
                updateInvitations={this.updateInvitations}
                onSaveAll={this.onSaveAll}
                onEditAll={this.onEditAll}
              />
            </Grid>
          </Grid>
        </Paper>
      </AppContext.Provider>
    )
  }
}

export default withStyles(styles)(App);
