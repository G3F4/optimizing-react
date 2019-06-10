import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import AppContext, { AppContextValue, DEFAULT_CALCULATIONS_COST, DEFAULT_INVITATION_COUNT } from '../AppContext';
import ListConnect from './list/ListConnect';
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

const styles = (theme: Theme) => ({
  root: {
    minHeight: '100vh',
    maxHeight: '100vh',
    margin: theme.spacing(1),
  },
  grid: {
    minHeight: '100vh',
    maxHeight: '100vh',
    overflow: 'hidden',
  },
  list: {
    maxHeight: '100vh',
    overflowY: 'scroll',
  },
});

interface State {
  context: AppContextValue;
}

class App extends Component<WithStyles, State> {
  public state: State = {
    context: {
      memo: false,
      pure: false,
      calculationsCost: DEFAULT_CALCULATIONS_COST,
      invitationsCount: DEFAULT_INVITATION_COUNT,
    },
  };

  public toggleMemo = (): void => this.setState({
    context: {
      ...this.state.context,
      memo: !this.state.context.memo,
    },
  })

  public togglePure = (): void => this.setState({
    context: {
      ...this.state.context,
      pure: !this.state.context.pure,
    },
  })

  public handleInvitationsCountChange = (length: string): void => {
    this.setState({
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

  public render() {
    const { classes } = this.props;
    const { context } = this.state;

    return (
      <AppContext.Provider value={{
        value: context,
        toggleMemo: this.toggleMemo,
        togglePure: this.togglePure,
        onInvitationsCountChange: this.handleInvitationsCountChange,
        onCalculationsCostChange: this.handleCalculationsCostChange,
      }}>
        <Paper className={classes.root}>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={5} sm={4} md={3} lg={2}>
              <Sidebar />
            </Grid>
            <Grid item xs={7} sm={8} md={9} lg={10} className={classes.list}>
              <ListConnect />
            </Grid>
          </Grid>
        </Paper>
      </AppContext.Provider>
    );
  }
}

// @ts-ignore
export default withStyles(styles)(App);
