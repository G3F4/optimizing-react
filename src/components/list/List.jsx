import React, { memo, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import AppContext from '../../AppContext';
import Item from '../item/Item';

const expensiveCalculations = length => Array.from({ length }, (v, k) => k).map(expensiveCalculations);

const ItemMemo = memo(Item);

export default function List(props) {
  const { invitations, updateInvitations, onSaveAll, onEditAll } = props;
  const { memo, pure } = useContext(AppContext);
  const ItemComponent = pure ? ItemMemo : Item;

  useMemo(() => {
    console.log(['calculating']);
    expensiveCalculations(20);
  }, [memo ? 0 : Date.now()]);

  return (
    <Paper>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Invitations
          </Typography>
          <Button color="inherit" onClick={onSaveAll}>Save all</Button>
          <Button color="inherit" onClick={onEditAll}>Edit all</Button>
        </Toolbar>
      </AppBar>
      <div>
      {invitations.map(invitation => (
        <ItemComponent
          key={invitation.id}
          invitation={invitation}
          updateInvitations={updateInvitations}
        />
        ))}
      </div>
    </Paper>
  );
}

List.propTypes = {
  invitations: PropTypes.array,
  updateInvitations: PropTypes.func,
  onSaveAll: PropTypes.func,
  onEditAll: PropTypes.func,
};
