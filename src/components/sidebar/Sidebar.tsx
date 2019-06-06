import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import React from 'react';
import CalculationsCost from './calculations-cost/CalculationsCost';
import InvitationsCount from './invitations-count/InvitationsCount';
import Optimizations from './optimizations/Optimizations';
import Times from './times/Times';

const styles = (theme: Theme) => ({
  root: {
    height: '100%',
    margin: theme.spacing(2),
  },
});

const Sidebar = ({ classes }: WithStyles) => (
  <div className={classes.root}>
    <Optimizations />
    <CalculationsCost />
    <InvitationsCount />
    <Times />
  </div>
);

export default withStyles(styles)(Sidebar);
