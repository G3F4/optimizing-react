import Paper from '@material-ui/core/Paper';
import React, { memo, useContext, useMemo } from 'react';
import AppContext from '../../AppContext';
import ItemContainer from '../item/ItemContainer';
import ListHeader from './header/ListHeader';
import { GuestInfo, Invitation } from './ListConnect';

const ItemMemo = memo(ItemContainer);

const expensiveCalculations = (length: number): any =>
  Array.from({ length }, (_v, k) => k).map(expensiveCalculations);

export interface ListProps {
  invitations: Invitation[];

  updateInvitation(id: string, guestInfo: GuestInfo): void;
}

function List(props: ListProps) {
  const { invitations, updateInvitation } = props;
  // tslint:disable-next-line:no-shadowed-variable
  const { value: { memo, pure, calculationsCost } } = useContext(AppContext);
  const ItemComponent = pure ? ItemMemo : ItemContainer;
  useMemo(() => {
    expensiveCalculations(calculationsCost);
  }, [memo ? 0 : Date.now()]);

  return (
    <Paper>
      <ListHeader />
      <div>
      {invitations.map(invitation => (
        <ItemComponent
          key={invitation.id}
          invitation={invitation}
          updateInvitation={updateInvitation}
        />
        ))}
      </div>
    </Paper>
  );
}

export default memo(List);
