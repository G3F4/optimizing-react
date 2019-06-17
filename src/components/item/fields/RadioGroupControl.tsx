import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { ChangeEvent } from 'react';

export interface RadioGroupControlProps {
  value: string;
  label: string;
  name: string;
  options: string[];

  onChange(_event: ChangeEvent<{}>, value: string): void;
}

const RadioGroupControl: React.FC<RadioGroupControlProps> = ({ value, options, label, name, onChange }) => (
  <FormControl>
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup
      value={value}
      name={name}
      onChange={onChange}
    >
      {options.map((label, key) => (
        <FormControlLabel
          key={key}
          value={key.toString()}
          label={label}
          control={<Radio color="primary" />}
          labelPlacement="start"
        />
      ))}
    </RadioGroup>
  </FormControl>
);

export default RadioGroupControl;
