import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

const style = {
  toggle: {
    marginBottom: 16,
  },
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
  paper: {
    height: '100%',
    width: '100%',
    padding: 5,
    display: 'inline-block',
  }
};
const COUNT_GROUP = [10, 50, 100];

export default class Sidebar extends PureComponent {
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
    const { onChangeInvitationsCount, invitationsCount, times, memoize, scu, toggleMemoize, toggleSCU } = this.props;

    return (
      <div className="Sidebar">
        <Paper style={style.paper}>
          <h3>Optimizations</h3>
          <div>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={scu}
                  onChange={toggleSCU}
                  style={style.toggle}
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
                  style={style.toggle}
                />
              }
              label="Memoization"
            />
          </div>
          <h3>Invitations count:</h3>
          <FormControl>
            <FormLabel component="legend">invitationCount</FormLabel>
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
                style={style.radioButton}
                control={<Radio color="primary" />}
                labelPlacement="start"
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
        </Paper>
      </div>
    );
  }
}
