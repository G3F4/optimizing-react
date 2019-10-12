import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { memo } from 'react';
import CalculationsCost from './calculations-cost/CalculationsCost';
import InvitationsCount from './invitations-count/InvitationsCount';
import Optimizations from './optimizations/Optimizations';
import Times from './times/Times';

const userSidebarStyles = makeStyles(theme =>
  createStyles({
    root: {
      height: '100%',
      paddingLeft: theme.spacing(2),
      maxHeight: '100vh',
      overflow: 'scroll',
    },
  }),
);

const Sidebar = () => {
  const classes = userSidebarStyles();

  return (
    <div className={classes.root}>
      <Optimizations />
      <CalculationsCost />
      <InvitationsCount />
      <Times />
    </div>
  );
};

export default memo(Sidebar);
