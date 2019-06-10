import React, { ChangeEvent } from 'react';
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
import { Invitation } from '../App';

const SEND_BY_RADIO_GROUP = ['E-mail', 'Fax', 'Postman', 'Owl'];
const GENDERS = ['Man', 'Woman', 'Gender'];

interface ItemProps {
  invitation: Invitation;

  onInvitationToggle(): void;
  onNameChange(event: ChangeEvent<HTMLInputElement>): void;
  onLastNameChange(event: ChangeEvent<HTMLInputElement>): void;
  onPlusOneChange(event: ChangeEvent<HTMLInputElement>): void;
  onSexChange(event: ChangeEvent<{ name?: string | undefined; value: unknown; }>): void;
  onTableChange(event: ChangeEvent<HTMLInputElement>): void;
  onSendByChange(_event: ChangeEvent<{}>, value: string): void;
}

const Item = (props: ItemProps) => {
  const {
    invitation,
    onInvitationToggle,
    onNameChange,
    onLastNameChange,
    onPlusOneChange,
    onSexChange,
    onTableChange,
    onSendByChange,
  } = props;
  const { expanded, guestInfo } = invitation;
  const { name, lastName, sex, plusOne, sendBy, table } = guestInfo;

  console.log(['Item.render'])

  return (
    <ExpansionPanel expanded={expanded} onChange={onInvitationToggle}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
                type="number"
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
              {SEND_BY_RADIO_GROUP.map((label, key) => (
                <FormControlLabel
                  key={key}
                  value={key.toString()}
                  label={label}
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

export default Item;
