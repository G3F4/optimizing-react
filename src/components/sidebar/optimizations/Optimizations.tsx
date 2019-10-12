import FormControlLabel from '@material-ui/core/FormControlLabel';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Switch from '@material-ui/core/Switch';
import React, { useContext } from 'react';
import AppContext from '../../../AppContext';

const useOptimizationsStyles = makeStyles(theme =>
  createStyles({
    toggle: {
      marginBottom: theme.spacing(2),
    },
  }),
);

const Optimizations = () => {
  const {
    value: { memo, pure },
    toggleMemo,
    togglePure,
  } = useContext(AppContext);
  const classes = useOptimizationsStyles();

  return (
    <div>
      <h3>Optimizations</h3>
      <div>
        <FormControlLabel
          label="PureComponent"
          control={
            <Switch
              color="primary"
              checked={pure}
              className={classes.toggle}
              onChange={togglePure}
            />
          }
        />
        <FormControlLabel
          label="Memoization"
          control={
            <Switch
              color="primary"
              checked={memo}
              className={classes.toggle}
              onChange={toggleMemo}
            />
          }
        />
      </div>
    </div>
  );
};

export default Optimizations;
