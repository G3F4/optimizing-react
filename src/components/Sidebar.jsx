import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import withStyles from '@material-ui/core/styles/withStyles';
import Switch from '@material-ui/core/Switch';
import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const COUNT_GROUP = [10, 50, 100];

const styles = theme => ({
  toggle: {
    marginBottom: theme.spacing(2),
  },
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: theme.spacing(2),
  },
  root: {
    height: '100%',
    margin: theme.spacing(2),
  }
});

class Sidebar extends PureComponent {
  static propTypes = {
    memoize: PropTypes.bool,
    scu: PropTypes.bool,
    toggleMemoize: PropTypes.func,
    toggleSCU: PropTypes.func,
    onChangeInvitationsCount: PropTypes.func,
    invitationsCount: PropTypes.number,
    times: PropTypes.array,
  };

  render() {
    const {
      classes,
      invitationsCount,
      times,
      memoize,
      scu,
      toggleMemoize,
      toggleSCU,
      onChangeInvitationsCount,
    } = this.props;

    return (
      <div className={classes.root}>
        <h3>Optimizations</h3>
        <div>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={scu}
                onChange={toggleSCU}
                className={classes.toggle}
              />
            }
            label="PureComponent"
          />
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={memoize}
                onChange={toggleMemoize}
                className={classes.toggle}
              />
            }
            label="Memoization"
          />
        </div>
        <h3>Invitations count:</h3>
        <FormControl>
          <RadioGroup
            onChange={(e, value) => onChangeInvitationsCount(value)}
            aria-label="invitationCount"
            name="invitationCount"
            value={invitationsCount.toString()}
          >
          {COUNT_GROUP.map((count, key) => (
            <FormControlLabel
              key={key}
              value={count.toString()}
              label={count}
              className={classes.radioButton}
              control={<Radio color="primary" />}
            />
          ))}
          </RadioGroup>
          <Button
            onClick={() => onChangeInvitationsCount(invitationsCount * 2)}
            fullWidth
          >Double count</Button>
        </FormControl>
        <h3>Update delta:</h3>
        <div className="times">
        {times.map((time, index) => 48 - index * 3 > 0 && (
          <div key={index} style={{ fontSize: 48 - index * 3 }}>{`${time} ms`}</div>
        ))}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);
