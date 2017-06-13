import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import SelectField from 'material-ui/SelectField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import moize from 'moize';

const style = {
  paper: {
    height: '100%',
    width: '100%',
    padding: 5,
    display: 'inline-block',
    overflowY: 'scroll',
  },
  title: {
    cursor: 'pointer',
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

  onNameChange = (e, value) => {
    if (this.props.onNameChange) {
      this.props.onNameChange(value);
    }
  };

  onLastNameChange = (e, value) => {
    if (this.props.onLastNameChange) {
      this.props.onLastNameChange(value);
    }
  };

  onPlusOneChange = (e, value) => {
    if (this.props.onPlusOneChange) {
      this.props.onPlusOneChange(value);
    }
  };

  onSexChange = (e, value) => {
    if (this.props.onSexChange) {
      this.props.onSexChange(value);
    }
  };

  onTableChange = (e, value) => {
    if (this.props.onTableChange) {
      this.props.onTableChange(value);
    }
  };

  onSendByChange = (e, value) => {
    if (this.props.onSendByChange) {
      this.props.onSendByChange(value);
    }
  };


  render() {
    const { id, expanded, onInvitationToggle, guestInfo } = this.props;
    const { name, lastName, sex, plusOne, sendBy, table } = guestInfo;

    return (
      <Card
        key={id}
        expanded={expanded}
        onExpandChange={() => onInvitationToggle(id)}
      >
        <CardHeader
          title={`${name} ${lastName}`}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true} style={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <div>
              <TextField
                hintText="Enter name"
                floatingLabelText="Name"
                value={name}
                onChange={this.onNameChange}
              />
            </div>
            <div>
              <TextField
                hintText="Enter last name"
                floatingLabelText="Last name"
                value={lastName}
                onChange={this.onLastNameChange}
              />
            </div>
            <div>
              <Checkbox
                checkedIcon={<ActionFavorite />}
                uncheckedIcon={<ActionFavoriteBorder />}
                label="Plus one"
                style={{ marginTop: 30 }}
                checked={plusOne}
                onCheck={this.onPlusOneChange}
              />
            </div>
          </div>
          <div style={{ width: '50%' }}>
            <div>
              <TextField
                hintText="Table"
                floatingLabelText="Enter table number"
                value={table}
                onChange={this.onTableChange}
              />
            </div>
            <div>
              <SelectField
                floatingLabelText="Sex"
                value={sex}
                autoWidth={true}
                onChange={this.onSexChange}
              >
              {GENDERS.map((primaryText, value) => (
                <MenuItem
                  key={value}
                  value={value}
                  primaryText={primaryText}
                />
              ))}
              </SelectField>
            </div>
            <div>
              <RadioButtonGroup
                valueSelected={sendBy}
                name="Send by"
                label="Send by"
                onChange={this.onSendByChange}
              >
              {SEND_BY_RADIO_GROUP.map((id, key) => (
                <RadioButton
                  key={key}
                  value={key}
                  label={id}
                />
              ))}
              </RadioButtonGroup>
            </div>
          </div>

        </CardText>
      </Card>
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

  getAppBar() {
    return (
      <AppBar
        title="Invitations"
        iconElementLeft={<span />}
        iconElementRight={
          <span>
            <FlatButton label="Save all" onClick={this.onSaveAll} />
            <FlatButton label="Edit all" onClick={this.onEditAll} />
          </span>
        }
      />
    );
  }

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
        <Paper style={style.paper} zDepth={5}>
          {this.getAppBar()}
          <div className="Invitations">
            {invitations.map(invitation => (
            <Invitation
              key={invitation.id}
              scu={scu}
              {...(memoize ? this.getInvitationProps : getInvitationProps)(invitation, updateInvitations)}
            />
          ))}
          </div>
          {this.getAppBar()}
        </Paper>
      </div>
    );
  }
}
