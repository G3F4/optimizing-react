import Paper from '@material-ui/core/Paper';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { memo, useContext, useMemo } from 'react';
import AppContext from '../../AppContext';
import Item from '../item/Item';
import ListHeader from './header/ListHeader';
import useList from './useList';

const ItemMemo = memo(Item);

const useListStyles = makeStyles(() =>
  createStyles({
    root: {
      maxHeight: '100%',
      overflow: 'scroll',
      width: '100%',
    },
  }),
);

const expensiveCalculations = (length: number): number => {
  return Array.from({ length }, (_v, k) => k).map(expensiveCalculations).length;
};

function List() {
  const [invitations, updateInvitation] = useList();
  const {
    value: { memo, pure, calculationsCost },
  } = useContext(AppContext);
  const ItemComponent = pure ? ItemMemo : Item;
  const classes = useListStyles();
  const memoizedExpensiveCalculations = useMemo(() => {
    return expensiveCalculations(calculationsCost);
  }, [calculationsCost]);

  return (
    <Paper className={classes.root}>
      <ListHeader />
      <div>
        {invitations.map(invitation => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const work = memo
            ? memoizedExpensiveCalculations
            : expensiveCalculations(calculationsCost);

          return (
            <ItemComponent
              key={invitation.id}
              invitation={invitation}
              updateInvitation={updateInvitation}
            />
          );
        })}
      </div>
    </Paper>
  );
}

export default memo(List);
