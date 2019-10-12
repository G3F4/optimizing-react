import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useCallback, useContext } from 'react';
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
  const handleInvitationsCountChange = useCallback(
    (_e, value) => onInvitationsCountChange(value),
    [onInvitationsCountChange],
  );
  const handleInvitationsCountDouble = useCallback(() => {
    onInvitationsCountChange((invitationsCount * 2).toString());
  }, [invitationsCount]);

  return (
    <div>
      <h3>Invitations count:</h3>
      <FormControl>
        <RadioGroup
          aria-label="invitationCount"
          name="invitationCount"
          value={invitationsCount.toString()}
          onChange={handleInvitationsCountChange}
        >
          {COUNT_GROUP.map((count, key) => (
            <FormControlLabel
              key={key}
              label={count}
              value={count.toString()}
              className={classes.radioButton}
              control={<Radio color="primary" />}
            />
          ))}
        </RadioGroup>
        <Button onClick={handleInvitationsCountDouble} fullWidth>
          Double count
        </Button>
      </FormControl>
    </div>
  );
};

export default InvitationsCount;
