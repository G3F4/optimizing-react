import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import React, { useContext } from 'react';
import AppContext from '../../../AppContext';

const COUNT_GROUP = [10, 50, 100];

const styles = (theme: Theme) => ({
  toggle: {
    marginBottom: theme.spacing(2),
  },
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: theme.spacing(2),
  },
  root: {
    height: '100%',
    margin: theme.spacing(2),
  },
});

const InvitationsCount = ({ classes }: WithStyles) => {
  const {
    value: { invitationsCount },
    onInvitationsCountChange,
  } = useContext(AppContext);

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

export default withStyles(styles)(InvitationsCount);
