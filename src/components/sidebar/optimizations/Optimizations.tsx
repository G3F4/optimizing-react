import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Switch from '@material-ui/core/Switch';
import React, { useContext } from 'react';
import AppContext from '../../../AppContext';

const styles = (theme: Theme) => ({
  toggle: {
    marginBottom: theme.spacing(2),
  },
});

const Optimizations = ({ classes }: WithStyles) => {
  const { value: { memo, pure }, toggleMemo, togglePure } = useContext(AppContext);

  return (
    <div>
      <h3>Optimizations</h3>
      <div>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={pure}
              onChange={togglePure}
              className={classes.toggle}
            />
          }
          label="PureComponent"
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={memo}
              onChange={toggleMemo}
              className={classes.toggle}
            />
          }
          label="Memoization"
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(Optimizations);
