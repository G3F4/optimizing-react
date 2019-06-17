import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React, { ChangeEvent, memo } from 'react';

export interface CheckboxControlControlProps {
  checked: boolean;
  label: string;

  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

const CheckboxControl: React.FC<CheckboxControlControlProps> = ({ checked, label, onChange }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
        />
      }
      label={label}
    />
  </div>
);

export default memo(CheckboxControl);
