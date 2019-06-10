import Paper from '@material-ui/core/Paper';
import { Spec } from 'immutability-helper';
import React, { memo, useContext, useMemo } from 'react';
import AppContext from '../../AppContext';
import { Invitation } from '../App';
import ItemContainer from '../item/ItemContainer';
import ListHeader from './header/ListHeader';

const ItemMemo = memo(ItemContainer);

const expensiveCalculations = (length: number): any =>
  Array.from({ length }, (_v, k) => k).map(expensiveCalculations);

export interface ListProps {
  invitations: Invitation[];

  updateInvitations(spec: Spec<Invitation[]>): void;
  onSaveAll(): void;
  onEditAll(): void;
}

function List(props: ListProps) {
  const { invitations, updateInvitations, onSaveAll, onEditAll } = props;
  // tslint:disable-next-line:no-shadowed-variable
  const { value: { memo, pure, calculationsCost } } = useContext(AppContext);
  const ItemComponent = pure ? ItemMemo : ItemContainer;
  useMemo(() => {
    expensiveCalculations(calculationsCost);
  }, [memo ? calculationsCost : Date.now()]);

  console.log(['List.render'])

  return (
    <Paper>
      <ListHeader onEditAll={onEditAll} onSaveAll={onSaveAll} />
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

export default memo(List);
