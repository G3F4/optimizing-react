import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext } from 'react';
import AppContext from '../../../AppContext';

const COUNT_GROUP = [10, 50, 100, 250];

const useInvitationCountStyles = makeStyles(theme =>
  createStyles({
    radioButton: {
      marginBottom: theme.spacing(2),
    },
  }),
);

const InvitationsCount = () => {
  const {
    value: { invitationsCount },
    onInvitationsCountChange,
  } = useContext(AppContext);
  const classes = useInvitationCountStyles();

  return (
    <div>
      <h3>Invitations count:</h3>
      <FormControl>
        <RadioGroup
          onChange={(_e, value) => onInvitationsCountChange(value)}
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
          onClick={() =>
            onInvitationsCountChange((invitationsCount * 2).toString())
          }
          fullWidth
        >
          Double count
        </Button>
      </FormControl>
    </div>
  );
};

export default InvitationsCount;
