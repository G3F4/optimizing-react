import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import PropTypes from 'prop-types';
import moize from 'moize';

const style = {
  wrapper: {
    flexGrow: 1,
  },
  paper: {
    height: '100%',
    width: '100%',
    padding: 5,
    display: 'inline-block',
    overflowY: 'scroll',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    height: '100%',
    width: '100%',
    overflowY: 'auto',
  },
  title: {
    flexGrow: 1,
  },
};
const SEND_BY_RADIO_GROUP = ['E-mail', 'Fax', 'Postman', 'Owl'];
const GENDERS = ['Man', 'Woman', 'Gender'];

class Invitation extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.scu && this.props.memoize) {
      return shallowCompare(this, nextProps, nextState);
    } else if (this.props.scu && !this.props.memoize) {
      return this.props.guestInfo !== nextProps.guestInfo || this.props.expanded !== nextProps.expanded;
    }

    return true;
  }

  onNameChange = event => {
    if (this.props.onNameChange) {
      this.props.onNameChange(event.target.value);
    }
  };

  onLastNameChange = event => {
    if (this.props.onLastNameChange) {
      this.props.onLastNameChange(event.target.value);
    }
  };

  onPlusOneChange = event => {
    if (this.props.onPlusOneChange) {
      this.props.onPlusOneChange(event.target.checked);
    }
  };

  onSexChange = event => {
    if (this.props.onSexChange) {
      this.props.onSexChange(event.target.value);
    }
  };

  onTableChange = event => {
    if (this.props.onTableChange) {
      this.props.onTableChange(event.target.value);
    }
  };

  onSendByChange = event => {
    if (this.props.onSendByChange) {
      this.props.onSendByChange(event.target.value);
    }
  };


  render() {
    const { expanded, onInvitationToggle, guestInfo } = this.props;
    const { name, lastName, sex, plusOne, sendBy, table } = guestInfo;

    return (
      <ExpansionPanel expanded={expanded} onChange={onInvitationToggle}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="h5">{`${name} ${lastName}`}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={{ width: '50%' }}>
            <div>
              <TextField
                label="Name"
                placeholder="Enter name"
                value={name}
                onChange={this.onNameChange}
              />
            </div>
            <div>
              <TextField
                label="Last name"
                placeholder="Enter last name"
                value={lastName}
                onChange={this.onLastNameChange}
              />
            </div>
            <div>
              <TextField
                label="Table"
                placeholder="Enter table number"
                value={table}
                onChange={this.onTableChange}
              />
            </div>
            <FormControlLabel
              style={{ marginTop: 30 }}
              control={
                <Checkbox
                  checked={plusOne}
                  onChange={this.onPlusOneChange}
                />
              }
              label="Plus one"
            />
          </div>
          <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
            <FormControl style={{ flexGrow: 1 }}>
              <InputLabel htmlFor="sex">Sex</InputLabel>
              <Select
                value={sex}
                onChange={this.onSexChange}
                inputProps={{
                  name: 'sex',
                  id: 'sex',
                }}
              >
                {GENDERS.map((primaryText, value) => (
                  <MenuItem
                    key={value}
                    value={value}
                  >{primaryText}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel component="legend">Send by</FormLabel>
              <RadioGroup
                value={sendBy.toString()}
                name="SendBy"
                onChange={this.onSendByChange}
              >
                {SEND_BY_RADIO_GROUP.map((id, key) => (
                  <FormControlLabel
                    key={key}
                    value={key.toString()}
                    label={id}
                    control={<Radio color="primary" />}
                    labelPlacement="start"
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>

    )
  }
}

const getInvitationProps = (invitation, updateInvitations) => {
  const { expanded, id, guestInfo } = invitation;
  const updateInvitation = mutation => updateInvitations({
    [id]: mutation,
  });
  const updateGuestInfo = mutation => updateInvitation({
    guestInfo: mutation,
  });
  const expensiveCalculations = () => {
    Array.from({ length: 10000 }, (v, k) => k).map(i => i * i);
  };

  expensiveCalculations();

  return {
    id,
    expanded,
    guestInfo,
    onInvitationToggle: () => {
      console.log(['Invitation.onInvitationToggle'], !expanded);
      updateInvitation({
        expanded: {
          $set: !expanded
        }
      });
    },
    onNameChange: value => {
      console.log(['Invitations.onNameChange'], value);
      updateGuestInfo({
        name: {
          $set: value
        }
      });
    },
    onLastNameChange: value => {
      console.log(['Invitations.onLastNameChange'], value);
      updateGuestInfo({
        lastName: {
          $set: value
        }
      });
    },
    onPlusOneChange: value => {
      console.log(['Invitations.onPlusOneChange'], value);
      updateGuestInfo({
        plusOne: {
          $set: value
        }
      });
    },
    onSexChange: value => {
      console.log(['Invitations.onSexChange'], value);
      updateGuestInfo({
        sex: {
          $set: value
        }
      });
    },
    onTableChange: value => {
      console.log(['Invitations.onTableChange'], value);
      updateGuestInfo({
        table: {
          $set: value
        }
      });
    },
    onSendByChange: value => {
      console.log(['Invitations.onSendByChange'], value);
      updateGuestInfo({
        sendBy: {
          $set: value
        }
      });
    },
  }
};

export default class Invitations extends Component {
  static propTypes = {
    invitations: PropTypes.array,
    updateInvitations: PropTypes.func,
    onSaveAll: PropTypes.func,
    onEditAll: PropTypes.func,
    memoize: PropTypes.bool
  };

  getInvitationProps = moize(getInvitationProps);

  onSaveAll = () => this.props.updateInvitations({
    $apply: invitations => invitations.map(invitation => ({ ...invitation, expanded: false }))
  });

  onEditAll = () => this.props.updateInvitations({
    $apply: invitations => invitations.map(invitation => ({ ...invitation, expanded: true }))
  });

  render() {
    const { invitations, updateInvitations, memoize, scu } = this.props;

    return (
      <div className="Box">
        <Paper style={style.paper}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" style={style.title}>
                Invitations
              </Typography>
              <Button color="inherit" onClick={this.onSaveAll}>Save all</Button>
              <Button color="inherit" onClick={this.onEditAll}>Edit all</Button>
            </Toolbar>
          </AppBar>
          <div className="Invitations">
            {invitations.map(invitation => (
            <Invitation
              key={invitation.id}
              scu={scu}
              {...(memoize ? this.getInvitationProps : getInvitationProps)(invitation, updateInvitations)}
            />
          ))}
          </div>
        </Paper>
      </div>
    );
  }
}
