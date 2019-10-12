import { IconButton } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import React, { useCallback, useContext } from 'react';
import AppContext from '../../../AppContext';

const CalculationsCost = () => {
  const {
    value: { calculationsCost },
    onCalculationsCostChange,
  } = useContext(AppContext);
  const handleDecrease = useCallback(() => {
    onCalculationsCostChange(calculationsCost - 1);
  }, [calculationsCost, onCalculationsCostChange]);
  const handleIncrease = useCallback(() => {
    onCalculationsCostChange(calculationsCost + 1);
  }, [calculationsCost, onCalculationsCostChange]);

  return (
    <div>
      <h3>Calculations cost:</h3>
      <IconButton onClick={handleDecrease}>
        <Remove />
      </IconButton>
      <IconButton disabled>{calculationsCost}</IconButton>
      <IconButton onClick={handleIncrease}>
        <Add />
      </IconButton>
    </div>
  );
};

export default CalculationsCost;
