import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

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
        <Paper style={style.paper} zDepth={1}>
          <h3>Optimizations</h3>
          <div>
            <Toggle
              toggled={scu}
              onToggle={toggleSCU}
              label="shouldComponentUpdate"
              labelPosition="right"
              style={style.toggle}
            />
            <Toggle
              toggled={memoize}
              onToggle={toggleMemoize}
              label="Memoization"
              labelPosition="right"
              style={style.toggle}
            />
          </div>
          <h3>Invitations count:</h3>
          <div>
            <RadioButtonGroup
              valueSelected={invitationsCount.toString()}
              onChange={(e, value) => onChangeInvitationsCount(value)}
              name="invitationCount"
            >
            {COUNT_GROUP.map((count, key) => (
              <RadioButton
                key={key}
                value={count.toString()}
                label={count}
                style={style.radioButton}
              />
            ))}
            </RadioButtonGroup>
            <FlatButton
              label="Double count"
              fullWidth={true}
              onClick={() => onChangeInvitationsCount(invitationsCount * 2)}
            />
          </div>
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
