import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { FC, lazy, Suspense } from 'react';
import Loader from '../loader/Loader';

const LazyList = lazy(() => import('../list/List'));
const LazySidebar = lazy(() => import('../sidebar/Sidebar'));

const useLayoutStyles = makeStyles(theme =>
  createStyles({
    root: {
      minHeight: '100%',
      maxHeight: '100%',
      minWidth: '100%',
      margin: theme.spacing(1),
    },
    grid: {
      minHeight: '100%',
      maxHeight: '100%',
      overflow: 'hidden',
    },
    sidebar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    list: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      maxHeight: '100vh',
      overflowY: 'scroll',
    },
    listContent: {},
  }),
);

const Layout: FC = () => {
  const classes = useLayoutStyles();

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={5} sm={4} md={3} lg={2} className={classes.sidebar}>
          <Suspense fallback={<Loader>Loading sidebar...</Loader>}>
            <LazySidebar />
          </Suspense>
        </Grid>
        <Grid item xs={7} sm={8} md={9} lg={10} className={classes.list}>
          <Suspense fallback={<Loader>Loading list...</Loader>}>
            <LazyList />
          </Suspense>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Layout;
