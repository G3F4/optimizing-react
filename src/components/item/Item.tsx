import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography/Typography';
import React, { FC, useContext } from 'react';
import AppContext from '../../AppContext';
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
  const {
    value: { disableRipple },
  } = useContext(AppContext);
  const { guestInfo } = invitation;
  const { name, lastName, sex, plusOne, sendBy, table } = guestInfo;

  return (
    <Paper className={classes.wrapper}>
      <Typography component="h5">{`${name} ${lastName}`}</Typography>
      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <TextControl
            label="Name"
            placeholder="Enter name"
            value={name}
            onChange={onNameChange}
          />
          <TextControl
            label="Last name"
            placeholder="Enter last name"
            value={lastName}
            onChange={onLastNameChange}
          />
          <TextControl
            label="Table"
            placeholder="Enter table number"
            type="number"
            value={table}
            onChange={onTableChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SelectControl
            label="Sex"
            name="sex"
            value={sex}
            options={GENDERS}
            onChange={onSexChange}
          />
          <CheckboxControl
            label="Plus one"
            checked={plusOne}
            disableRipple={disableRipple}
            onChange={onPlusOneChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RadioGroupControl
            name="sendBy"
            label="Send by"
            value={sendBy.toString()}
            options={SEND_BY_RADIO_GROUP}
            disableRipple={disableRipple}
            onChange={onSendByChange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Item;
