import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid/Grid';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';

const SEND_BY_RADIO_GROUP = ['E-mail', 'Fax', 'Postman', 'Owl'];
const GENDERS = ['Man', 'Woman', 'Gender'];

const Item = props => {
  const { updateInvitations, invitation } = props;
  const { id, expanded, guestInfo } = invitation;
  const { name, lastName, sex, plusOne, sendBy, table } = guestInfo;
  const onInvitationToggle = () => {
    updateInvitations({
      [id]: {
        expanded: {
          $set: !expanded,
        },
      },
    });
  };
  const onNameChange = event => {
    updateInvitations({
      [id]: {
        guestInfo: {
          name: {
            $set: event.target.value,
          },
        },
      },
    });
  };
  const onLastNameChange = event => {
    updateInvitations({
      [id]: {
        guestInfo: {
          lastName: {
            $set: event.target.value,
          },
        },
      },
    });
  };
  const onPlusOneChange = event => {
    updateInvitations({
      [id]: {
        guestInfo: {
          plusOne: {
            $set: event.target.checked,
          },
        },
      },
    });
  };
  const onSexChange = event => {
    updateInvitations({
      [id]: {
        guestInfo: {
          sex: {
            $set: event.target.value,
          },
        },
      },
    });
  };
  const onTableChange = event => {
    updateInvitations({
      [id]: {
        guestInfo: {
          table: {
            $set: event.target.value,
          },
        },
      },
    });
  };
  const onSendByChange = event => {
    updateInvitations({
      [id]: {
        guestInfo: {
          sendBy: {
            $set: event.target.value,
          },
        },
      },
    });
  };

  return (
    <ExpansionPanel expanded={expanded} onChange={onInvitationToggle}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
        <Typography component="h5">{`${name} ${lastName}`}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container>
          <Grid item xs={4}>
            <div>
              <TextField
                label="Name"
                placeholder="Enter name"
                value={name}
                onChange={onNameChange}
              />
            </div>
            <div>
              <TextField
                label="Last name"
                placeholder="Enter last name"
                value={lastName}
                onChange={onLastNameChange}
              />
            </div>
            <div>
              <TextField
                label="Table"
                placeholder="Enter table number"
                value={table}
                onChange={onTableChange}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <InputLabel htmlFor="sex">Sex</InputLabel>
              <Select
                value={sex}
                onChange={onSexChange}
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
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={plusOne}
                    onChange={onPlusOneChange}
                  />
                }
                label="Plus one"
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <FormLabel component="legend">Send by</FormLabel>
              <RadioGroup
                value={sendBy.toString()}
                name="SendBy"
                onChange={onSendByChange}
              >
                {SEND_BY_RADIO_GROUP.map((id, key) => (
                  <FormControlLabel
                    key={key}
                    value={key.toString()}
                    label={id}
                    control={<Radio color="primary"/>}
                    labelPlacement="start"
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>

  );
};

Item.propTypes = {
  expanded: PropTypes.bool,
  guestInfo: PropTypes.object,
  onInvitationToggle: PropTypes.func,
};

export default Item;
