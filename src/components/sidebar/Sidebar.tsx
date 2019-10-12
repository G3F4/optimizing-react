import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import React, { memo } from 'react';
import CalculationsCost from './calculations-cost/CalculationsCost';
import InvitationsCount from './invitations-count/InvitationsCount';
import Optimizations from './optimizations/Optimizations';
import Times from './times/Times';

const styles = (theme: Theme) => ({
  root: {
    height: '100%',
    paddingLeft: theme.spacing(2),
    maxHeight: '100vh',
    overflow: 'scroll',
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

export default memo(withStyles(styles)(Sidebar));
