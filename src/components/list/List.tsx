import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import { Spec } from 'immutability-helper';
import React, { memo, useContext, useMemo } from 'react';
import AppContext from '../../AppContext';
import { Invitation } from '../App';
import Item from '../item/Item';

const expensiveCalculations = (length: number): any =>
  Array.from({ length }, (_v, k) => k).map(expensiveCalculations);

const ItemMemo = memo(Item);

interface ListProps {
  invitations: Invitation[];
  updateInvitations(spec: Spec<Invitation[]>): void;
  onSaveAll(): void;
  onEditAll(): void;
}

export default function List(props: ListProps) {
  const { invitations, updateInvitations, onSaveAll, onEditAll } = props;
  // tslint:disable-next-line:no-shadowed-variable
  const { value: { memo, pure, calculationsCost } } = useContext(AppContext);
  const ItemComponent = pure ? ItemMemo : Item;

  useMemo(() => {
    expensiveCalculations(calculationsCost);
  }, [memo ? calculationsCost : Date.now()]);

  return (
    <Paper>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Invitations
          </Typography>
          <div style={{ flexGrow: 1 }} />
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
