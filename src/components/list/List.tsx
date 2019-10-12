import Paper from '@material-ui/core/Paper';
import React, { memo, useContext, useMemo } from 'react';
import AppContext from '../../AppContext';
import ItemContainer from '../item/ItemContainer';
import ListHeader from './header/ListHeader';
import useList from './useList';

const ItemMemo = memo(ItemContainer);

const expensiveCalculations = (length: number) => {
  Array.from({ length }, (_v, k) => k).map(expensiveCalculations);
};

function List() {
  const [invitations, updateInvitation] = useList();
  const {
    value: { memo, pure, calculationsCost },
  } = useContext(AppContext);
  const ItemComponent = pure ? ItemMemo : ItemContainer;
  useMemo(() => {
    expensiveCalculations(calculationsCost);
  }, [memo ? 0 : Date.now()]); // eslint-disable-line

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
