import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { name, random } from 'faker';
import update, { Spec } from 'immutability-helper';
import React, { Component } from 'react';
import AppContext, { AppContextValue, DEFAULT_CALCULATIONS_COST, DEFAULT_INVITATION_COUNT } from '../AppContext';
import List from './list/List';
import Sidebar from './sidebar/Sidebar';

export interface Invitation {
  id: string;
  expanded: boolean;
  guestInfo: GuestInfo;
}

export interface GuestInfo {
  name: string;
  lastName: string;
  table: number;
  plusOne: boolean;
  sex: number;
  sendBy: number;
}

const generateInvitation = (_: any, id: number): Invitation => ({
  id: id.toString(),
  expanded: false,
  guestInfo: {
    name: name.firstName(random.number({ min: 0, max: 1 })),
    lastName: name.lastName(random.number({ min: 0, max: 1 })),
    table: random.number({ min: 1, max: 10 }),
    plusOne: random.boolean(),
    sex: random.number({ min: 1, max: 3 }),
    sendBy: random.number({ min: 1, max: 4 }),
  },
});

const styles = (theme: Theme) => ({
  root: {
    minHeight: '100vh',
    margin: theme.spacing(1),
  },
  grid: {
    minHeight: '100vh',
  },
});

interface State {
  context: AppContextValue;
  invitations: Invitation[];
}

class App extends Component<WithStyles, State> {
  public state: State = {
    context: {
      memo: false,
      pure: false,
      times: [],
      calculationsCost: DEFAULT_CALCULATIONS_COST,
      invitationsCount: DEFAULT_INVITATION_COUNT,
    },
    invitations: Array.from({ length: DEFAULT_INVITATION_COUNT }, generateInvitation),
  };

  public time = Date.now();

  public componentWillUpdate(): void {
      this.time = Date.now();
  }

  public componentDidUpdate(_prevProps: WithStyles, prevState: State): void {
    this.refreshTimes(this.state.context.times === prevState.context.times);
  }

  public refreshTimes(hasTimeChanged: boolean): void {
    if (hasTimeChanged) {
      this.setState({
        context: {
          ...this.state.context,
          times: [
            Date.now() - this.time,
            ...this.state.context.times,
          ],
        },
      });
    }
  }

  public toggleMemo = () => this.setState({
    context: {
      ...this.state.context,
      memo: !this.state.context.memo,
    },
  })

  public togglePure = () => this.setState({
    context: {
      ...this.state.context,
      pure: !this.state.context.pure,
    },
  })

  public handleInvitationsCountChange = (length: string): void => {
    this.setState({
      invitations: Array.from({ length: parseInt(length, 10) }, generateInvitation),
      context: {
        ...this.state.context,
        invitationsCount: parseInt(length, 10),
      },
    });
  }

  public handleCalculationsCostChange = (cost: string): void => {
    this.setState({
      context: {
        ...this.state.context,
        calculationsCost: parseInt(cost, 10),
      },
    });
  }

  public handleSaveAll = (): void => {
    this.updateInvitations({
      $apply: (invitations: Invitation[]) => invitations.map(invitation => ({ ...invitation, expanded: false })),
    });
  }

  public handleEditAll = (): void => {
    this.updateInvitations({
      $apply: (invitations: Invitation[]) => invitations.map(invitation => ({ ...invitation, expanded: true })),
    });
  }

  public updateInvitations = (spec: Spec<Invitation[]>) => {
    this.setState({
      invitations: update(this.state.invitations, spec),
    });
  }

  public render() {
    const { classes } = this.props;
    const { context, invitations } = this.state;

    return (
      <AppContext.Provider value={{
        value: context,
        togglePure: this.togglePure,
        toggleMemo: this.toggleMemo,
        onInvitationsCountChange: this.handleInvitationsCountChange,
        onCalculationsCostChange: this.handleCalculationsCostChange,
      }}>
        <Paper className={classes.root}>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={5} sm={4} md={3}>
              <Sidebar />
            </Grid>
            <Grid item xs={7} sm={8} md={9}>
              <List
                invitations={invitations}
                updateInvitations={this.updateInvitations}
                onSaveAll={this.handleSaveAll}
                onEditAll={this.handleEditAll}
              />
            </Grid>
          </Grid>
        </Paper>
      </AppContext.Provider>
    );
  }
}

export default withStyles(styles)(App);
