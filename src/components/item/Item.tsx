import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography/Typography';
import React, { FC } from 'react';
import { GuestInfo, Invitation } from '../list/useList';
import CheckboxControl from './fields/CheckboxControl';
import RadioGroupControl from './fields/RadioGroupControl';
import SelectControl from './fields/SelectControl';
import TextControl from './fields/TextControl';
import useItem from './useItem';

const SEND_BY_RADIO_GROUP = ['E-mail', 'Fax', 'Postman', 'Owl'];
const GENDERS = ['Man', 'Woman', 'Gender'];

const useItemStyles = makeStyles(theme =>
  createStyles({
    wrapper: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
    },
  }),
);

interface ItemProps {
  invitation: Invitation;

  updateInvitation(id: string, guestInfo: GuestInfo): void;
}

const Item: FC<ItemProps> = props => {
  const {
    invitation,
    onNameChange,
    onLastNameChange,
    onPlusOneChange,
    onSexChange,
    onTableChange,
    onSendByChange,
  } = useItem(props.invitation, props.updateInvitation);
  const classes = useItemStyles();
  const { guestInfo } = invitation;
  const { name, lastName, sex, plusOne, sendBy, table } = guestInfo;

  return (
    <Paper className={classes.wrapper}>
      <Typography component="h5">{`${name} ${lastName}`}</Typography>
      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <TextControl
            value={name}
            label="Name"
            placeholder="Enter name"
            onChange={onNameChange}
          />
          <TextControl
            value={lastName}
            label="Last name"
            placeholder="Enter last name"
            onChange={onLastNameChange}
          />
          <TextControl
            value={table}
            label="Table"
            placeholder="Enter table number"
            type="number"
            onChange={onTableChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SelectControl
            value={sex}
            label="Sex"
            name="sex"
            options={GENDERS}
            onChange={onSexChange}
          />
          <CheckboxControl
            checked={plusOne}
            label="Plus one"
            onChange={onPlusOneChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RadioGroupControl
            value={sendBy.toString()}
            name="sendBy"
            label="Send by"
            options={SEND_BY_RADIO_GROUP}
            onChange={onSendByChange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Item;
