import { Paper, Theme, WithStyles } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { ChangeEvent } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import { Invitation } from '../list/ListConnect';
import CheckboxControl from './fields/CheckboxControl';
import RadioGroupControl from './fields/RadioGroupControl';
import SelectControl from './fields/SelectControl';
import TextControl from './fields/TextControl';

const SEND_BY_RADIO_GROUP = ['E-mail', 'Fax', 'Postman', 'Owl'];
const GENDERS = ['Man', 'Woman', 'Gender'];

const styles = (theme: Theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
});

interface ItemProps extends WithStyles {
  invitation: Invitation;

  onNameChange(event: ChangeEvent<HTMLInputElement>): void;
  onLastNameChange(event: ChangeEvent<HTMLInputElement>): void;
  onPlusOneChange(event: ChangeEvent<HTMLInputElement>): void;
  onSexChange(event: ChangeEvent<{ name?: string | undefined; value: unknown; }>): void;
  onTableChange(event: ChangeEvent<HTMLInputElement>): void;
  onSendByChange(_event: ChangeEvent<{}>, value: string): void;
}

const Item = (props: ItemProps) => {
  const {
    classes,
    invitation,
    onNameChange,
    onLastNameChange,
    onPlusOneChange,
    onSexChange,
    onTableChange,
    onSendByChange,
  } = props;
  const { guestInfo } = invitation;
  const { name, lastName, sex, plusOne, sendBy, table } = guestInfo;

  return (
    <Paper className={classes.wrapper}>
      <Typography component="h5">{`${name} ${lastName}`}</Typography>
      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <TextControl value={name} label="Name" placeholder="Enter name" onChange={onNameChange} />
          <TextControl value={lastName} label="Last name" placeholder="Enter last name" onChange={onLastNameChange} />
          <TextControl value={table} label="Table" placeholder="Enter table number" type="number" onChange={onTableChange} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SelectControl value={sex} label="Sex" name="sex" options={GENDERS} onChange={onSexChange} />
          <CheckboxControl checked={plusOne} label="Plus one" onChange={onPlusOneChange} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RadioGroupControl value={sendBy.toString()} name="sendBy" label="Send by" options={SEND_BY_RADIO_GROUP} onChange={onSendByChange} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withStyles(styles)(Item);
