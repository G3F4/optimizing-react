import TextField from '@material-ui/core/TextField/TextField';
import React, { ChangeEvent, useCallback, useContext } from 'react';
import AppContext from '../../../AppContext';

const CalculationsCost = () => {
  const { value: { calculationsCost }, onCalculationsCostChange } = useContext(AppContext);
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onCalculationsCostChange(event.target.value);
  }, [onCalculationsCostChange]);

  return (
    <div>
      <h3>Calculations cost:</h3>
      <TextField
        label="Cost"
        placeholder="Enter cost"
        value={calculationsCost}
        onChange={handleChange}
        type="number"
      />
    </div>
  );
};

export default CalculationsCost;
