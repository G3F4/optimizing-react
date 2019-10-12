import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { ChangeEvent, FC } from 'react';

export interface RadioGroupControlProps {
  value: string;
  label: string;
  name: string;
  options: string[];
  disableRipple: boolean;

  onChange(_event: ChangeEvent<{}>, value: string): void;
}

const RadioGroupControl: FC<RadioGroupControlProps> = ({
  value,
  options,
  label,
  name,
  disableRipple,
  onChange,
}) => (
  <FormControl>
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup value={value} name={name} onChange={onChange}>
      {options.map((label, key) => (
        <FormControlLabel
          labelPlacement="start"
          key={key}
          label={label}
          value={key.toString()}
          control={<Radio color="primary" disableRipple={disableRipple} />}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

export default RadioGroupControl;
