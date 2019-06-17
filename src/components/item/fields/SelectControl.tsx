import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React, { ChangeEvent } from 'react';

export interface SelectControlProps {
  value: number;
  label: string;
  name: string;
  options: string[];

  onChange(event: ChangeEvent<{ name?: string | undefined; value: unknown; }>): void;
}

const SelectControl: React.FC<SelectControlProps> = ({ label, value, name, options, onChange }) => (
  <FormControl>
    <InputLabel htmlFor={name}>{label}</InputLabel>
    <Select
      value={value}
      onChange={onChange}
      inputProps={{
        name,
        id: name,
      }}
    >
      {/* tslint:disable-next-line:no-shadowed-variable */}
      {options.map((text, value) => (
        <MenuItem
          key={value}
          value={value}
        >{text}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default SelectControl;
